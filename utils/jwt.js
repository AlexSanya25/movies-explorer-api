// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken');

// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();

const { JWT_SECRET, NODE_ENV } = process.env;
const generateToken = (payload) => jwt.sign(payload, NODE_ENV !== 'production' ? 'jwt_secret' : JWT_SECRET, {
  expiresIn: 604800,
});

module.exports = generateToken;
