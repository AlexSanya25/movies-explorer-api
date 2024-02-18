const Router = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
const { celebrate } = require('celebrate');

const {
  createUser,
  login,
// eslint-disable-next-line import/extensions, import/no-unresolved
} = require('../controllers/user.js');

// eslint-disable-next-line import/extensions
const { signUpJoi, signInJoi } = require('../joi/joi.js');

const adminsRouter = Router();

adminsRouter.post('/signup', celebrate(signUpJoi), createUser);
adminsRouter.post('/signin', celebrate(signInJoi), login);

module.exports = adminsRouter;
