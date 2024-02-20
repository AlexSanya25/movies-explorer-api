/* eslint-disable import/extensions */

const HttpCodesCards = require('./constants.js');

class NotDelete extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotDelete';
    this.statusCode = HttpCodesCards.notDeleteErr;
  }
}

module.exports = NotDelete;
