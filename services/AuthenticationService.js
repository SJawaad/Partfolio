const db = require("../database/db");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const AuthenticationToken = require("../models/AuthenticationToken");

class AuthenticationService {
  async registerUser(email, password, role) {
    const passwordHash = await bcrypt.hash(password, 10);

    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO users (email, password, role) VALUES (?, ?, ?)",
        [email, passwordHash, role],
        (err) => {
          if (err) {
            if (err.code === "ER_DUP_ENTRY")
              return reject("Email already exists");
            return reject(err.message);
          }
          resolve("User registered successfully");
        }
      );
    });
  }

  async authenticateUser(email, password) {
    // Step 1 of login: validate credentials, send token by email
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        async (err, results) => {
          if (err || results.length === 0) return reject("Invalid credentials");

          const user = results[0];
          const ok = await bcrypt.compare(password, user.password);
          if (!ok) return reject("Invalid credentials");

          // one active session: invalidate any existing tokens
          await this.generateToken(user.user_id, email); // generate + store + email
          resolve("Authentication token sent to your email");
        }
      );
    });
  }

  async generateToken(userId, email) {
    // 6-digit code, expires in 30 seconds
    const code = String(Math.floor(100000 + Math.random() * 900000));
    const expiryTime = new Date(Date.now() + 30 * 1000);

    // Mark any previous tokens as used (single active session concept)
    await new Promise((resolve, reject) => {
      db.query(
        "UPDATE authentication_tokens SET is_used = TRUE WHERE user_id = ? AND is_used = FALSE",
        [userId],
        (err) => (err ? reject(err) : resolve())
      );
    });

    // Insert new token
    const tokenObj = await new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO authentication_tokens (user_id, token_value, expiry_time, is_used) VALUES (?, ?, ?, FALSE)",
        [userId, code, expiryTime],
        (err, result) => {
          if (err) return reject(err);
          resolve(
            new AuthenticationToken(
              result.insertId,
              userId,
              code,
              expiryTime,
              false
            )
          );
        }
      );
    });

    // Send email
    await this._sendTokenEmail(email, code);
    return tokenObj;
  }

  async validateToken(email, tokenValue) {
    // Step 2 of login: validate the token user enters
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT u.user_id, u.role, t.token_id, t.expiry_time, t.is_used
         FROM users u
         JOIN authentication_tokens t ON t.user_id = u.user_id
         WHERE u.email = ? AND t.token_value = ? AND t.is_used = FALSE
         ORDER BY t.token_id DESC
         LIMIT 1`,
        [email, tokenValue],
        (err, results) => {
          if (err || results.length === 0) return reject("Invalid token");

          const row = results[0];
          if (new Date() > new Date(row.expiry_time))
            return reject("Token expired");

          // mark token as used once validated
          db.query(
            "UPDATE authentication_tokens SET is_used = TRUE WHERE token_id = ?",
            [row.token_id],
            (updErr) => {
              if (updErr) return reject("Could not update token");
              // login complete
              resolve({ userId: row.user_id, role: row.role });
            }
          );
        }
      );
    });
  }

  async _sendTokenEmail(toEmail, code) {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: toEmail,
      subject: "Partfolio Authentication Token",
      text: `Your token is: ${code}. It expires in 30 seconds.`,
    });
  }
}

module.exports = AuthenticationService;
