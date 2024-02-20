const jwt = require('jsonwebtoken');

require('dotenv').config();

const { JWT_SECRET, NODE_ENV } = process.env;
const generateToken = (payload) => jwt.sign(payload, NODE_ENV !== 'production' ? 'jwt_secret' : JWT_SECRET, {
  expiresIn: 604800,
});

module.exports = generateToken;
