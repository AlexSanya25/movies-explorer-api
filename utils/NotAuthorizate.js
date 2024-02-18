// eslint-disable-next-line import/extensions
const HttpCodesCards = require('./constants.js');

class NotAuthorizate extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotAuthorizate';
    this.statusCode = HttpCodesCards.mismatchErr;
  }
}

module.exports = NotAuthorizate;
