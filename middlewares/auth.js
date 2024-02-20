/* eslint-disable func-names */
/* eslint-disable import/extensions */
const jwt = require('jsonwebtoken');

const NotAuthorizate = require('../utils/NotAuthorizate.js');

require('dotenv').config();

const { JWT_SECRET, NODE_ENV } = process.env;

module.exports = function (req, res, next) {
  let payload;
  try {
    const token = req.headers.authorization;
    if (!token) {
      throw new NotAuthorizate('С токеном что-то не так');
    }
    const validToken = token.replace('Bearer ', '');
    payload = jwt.verify(validToken, NODE_ENV !== 'production' ? 'jwt_secret' : JWT_SECRET);
  } catch (error) {
    next(new NotAuthorizate('С токеном что-то не так'));
  }
  req.user = payload;
  next();
};
