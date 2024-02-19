/* eslint-disable import/extensions */
const Router = require('express');

const {
  getUser,
  upUser,
} = require('../controllers/user.js');

const userRouter = Router();

userRouter.get('/users/me', getUser);
userRouter.patch('/users/me', upUser);

module.exports = userRouter;
