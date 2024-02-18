// eslint-disable-next-line import/extensions
const HttpCodesCards = require('./constants.js');

module.exports = class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ConflictError';
    this.statusCode = HttpCodesCards.conflict;
  }
};
