const User = require('./User');

class Manager extends User {
  constructor(userId, email, password) {
    super(userId, email, password);
    this.role = "Manager";
  }

  acquireComponent() {}
}

module.exports = Manager;