const AuthenticationService = require("./AuthenticationService");

class PartfolioFacade {
  constructor() {
    this.authService = new AuthenticationService();
  }

  registerAccount(email, password, role) {
    return this.authService.registerUser(email, password, role);
  }

  login(email, password, tokenValue) {
    if (password && !tokenValue) {
      return this.authService.authenticateUser(email, password);
    }
    if (tokenValue && !password) {
      return this.authService.validateToken(email, tokenValue);
    }
    return Promise.reject("Invalid login request");
  }

  searchComponents() {}
  reserveComponent() {}
  cancelReservation() {}
  acquireComponent() {}
}

module.exports = PartfolioFacade;
