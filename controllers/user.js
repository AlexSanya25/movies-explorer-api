/* eslint-disable import/extensions */
/* eslint-disable consistent-return */

const bcrypt = require('bcrypt');

const User = require('../models/user.js');

const NotValidIdError = require('../utils/NotValidIdError.js');

const NotFoundError = require('../utils/NotFoundError.js');

const ConflictError = require('../utils/ConflictError.js');

const NotAuthorizate = require('../utils/NotAuthorizate.js');

const HttpCodesCards = require('../utils/constants.js');

const generateToken = require('../utils/jwt.js');

const getUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    if (!user) {
      throw new NotValidIdError('User not found');
    }
    return res.status(HttpCodesCards.success).send(user);
  } catch (error) {
    if (error.message === 'User not found') {
      next(new NotValidIdError('Переданы не валидные данные'));
      return;
    }
    next(error);
  }
};

const upUser = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const upUserProfile = await User.findByIdAndUpdate(
      req.user._id,
      { name, email },
      { new: true, runValidators: true },
    );
    return res.status(HttpCodesCards.create).send(upUserProfile);
  } catch (error) {
    if (error.code === HttpCodesCards.dublicate) {
      next(new ConflictError('Почтовый ящик принадлежит другому пользователю'));
      return;
    }
    if (error.name === 'ValidationError') {
      next(new NotValidIdError('Переданы не валидные данные'));
      return;
    }
    if (error.name === 'NotFoundError') {
      next(new NotFoundError('Пользователь по заданному ID не найден'));
      return;
    }
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    const soltRounds = 10;
    const hash = await bcrypt.hash(password, soltRounds);
    const newUser = await User.create({ email, password: hash, name });
    return res.status(HttpCodesCards.create).send({
      name: newUser.name, email: newUser.email, id: newUser._id,
    });
  } catch (error) {
    if (error.code === HttpCodesCards.dublicate) {
      next(new ConflictError('Такой пользователь уже существует'));
      return;
    }
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const userAdmin = await User.findOne({ email }).select('+password').orFail(
      () => new Error('NotAuthantificate'),
    );
    const matched = await bcrypt.compare(password, userAdmin.password);
    if (!matched) {
      throw new Error('NotAuthantificate');
    }

    const token = generateToken({ _id: userAdmin._id });
    return res.status(HttpCodesCards.success).send(
      {
        name: userAdmin.name, email: userAdmin.email, id: userAdmin._id, token,
      },
    );
  } catch (error) {
    if (error.message === 'NotAuthantificate') {
      next(new NotAuthorizate('Неверно введены данные'));
      return;
    }
    next(error);
  }
};

module.exports = {
  getUser,
  upUser,
  createUser,
  login,
};
