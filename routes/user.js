const Router = require('express');

const {
  getUser,
  upUser,
// eslint-disable-next-line import/extensions
} = require('../controllers/user.js');

const userRouter = Router();

userRouter.get('/users/me', getUser);
userRouter.patch('/users/me', upUser);

module.exports = userRouter;
