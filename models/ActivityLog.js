class ActivityLog {
  constructor(logId, userId, action, timestamp) {
    this.logId = logId;
    this.userId = userId;
    this.action = action;
    this.timestamp = timestamp;
  }
}

module.exports = ActivityLog;