const Observer = require('../interfaces/Observer');

class Notification extends Observer {
  constructor(notificationId, recipientEmail, message, type, sentAt) {
    super();
    this.notificationId = notificationId;
    this.recipientEmail = recipientEmail;
    this.message = message;
    this.type = type;
    this.sentAt = sentAt;
  }

  update(message) {
    this.message = message;
    this.send();
  }

  send() {
    console.log(`Email sent to ${this.recipientEmail}: ${this.message}`);
  }
}

module.exports = Notification;