const User = require('./User');

class Supervisor extends User {
  constructor(userId, email, password) {
    super(userId, email, password);
    this.role = "Supervisor";
  }

  viewMonthlyReport() {}
}

module.exports = Supervisor;