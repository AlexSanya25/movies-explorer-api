/* eslint-disable import/extensions */
const Router = require('express');

const { celebrate } = require('celebrate');

const {
  createUser,
  login,
} = require('../controllers/user.js');

const { signUpJoi, signInJoi } = require('../joi/joi.js');

const adminsRouter = Router();

adminsRouter.post('/signup', celebrate(signUpJoi), createUser);
adminsRouter.post('/signin', celebrate(signInJoi), login);

module.exports = adminsRouter;
