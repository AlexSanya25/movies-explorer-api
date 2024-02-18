class NotValidIdError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotValidIdError';
    this.statusCode = 400;
  }
}

module.exports = NotValidIdError;
