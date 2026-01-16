const User = require('./User');

class Engineer extends User {
  constructor(userId, email, password) {
    super(userId, email, password);
    this.role = "Engineer";
    this.maxReservations = 5;
  }

  searchComponents() {}
  reserveComponent(componentId) {}
}

module.exports = Engineer;