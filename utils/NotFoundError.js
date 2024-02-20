/* eslint-disable import/extensions */
const HttpCodesCards = require('./constants.js');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = HttpCodesCards.notFoundErr;
  }
}

module.exports = NotFoundError;
