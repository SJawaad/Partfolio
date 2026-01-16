const User = require('./User');

class SystemAdministrator extends User {
  constructor(userId, email, password) {
    super(userId, email, password);
    this.role = "Admin";
  }

  monitorLogs() {}
  performMaintenance() {}
}

module.exports = SystemAdministrator;