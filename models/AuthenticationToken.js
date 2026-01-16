class AuthenticationToken {
  constructor(tokenId, userId, tokenValue, expiryTime, isUsed) {
    this.tokenId = tokenId;
    this.userId = userId;
    this.tokenValue = tokenValue;
    this.expiryTime = expiryTime;
    this.isUsed = isUsed;
  }
}

module.exports = AuthenticationToken;