require("dotenv").config();
const express = require("express");
const PartfolioFacade = require("./services/PartfolioFacade");

const app = express();
const facade = new PartfolioFacade();

app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/login.html");
});

// Registration
app.post("/register", async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const msg = await facade.registerAccount(email, password, role);
    res.send(msg);
  } catch (e) {
    res.status(400).send(String(e));
  }
});

// Login step 1: email+password -> sends token
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const msg = await facade.login(email, password, null);
    res.send(msg);
  } catch (e) {
    res.status(401).send(String(e));
  }
});

// Login step 2: email+token -> validates token
app.post("/login-token", async (req, res) => {
  try {
    const { email, token } = req.body;
    const userInfo = await facade.login(email, null, token);
    res.json(userInfo);
  } catch (e) {
    res.status(401).send(String(e));
  }
});

app.listen(3000, () => console.log("Server running at http://localhost:3000"));
