class Reservation {
  constructor(reservationId, engineerId, componentId, startDate, expiryDate) {
    this.reservationId = reservationId;
    this.engineerId = engineerId;
    this.componentId = componentId;
    this.startDate = startDate;
    this.expiryDate = expiryDate;
    this.observers = [];
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  notifyObservers(message) {
    this.observers.forEach(o => o.update(message));
  }

  cancelReservation() {
    this.notifyObservers("Reservation cancelled");
  }
}

module.exports = Reservation;