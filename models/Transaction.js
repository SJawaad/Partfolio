class Transaction {
  constructor(transactionId, managerId, amount, method, date) {
    this.transactionId = transactionId;
    this.managerId = managerId;
    this.amount = amount;
    this.method = method;
    this.date = date;
  }
}

module.exports = Transaction;