// eslint-disable-next-line import/no-extraneous-dependencies, import/order
const bcrypt = require('bcrypt');

/* eslint-disable import/extensions */
const User = require('../models/user.js');

// eslint-disable-next-line import/no-unresolved
const NotValidIdError = require('../utils/NotValidIdError.js');

// eslint-disable-next-line import/no-unresolved
const NotFoundError = require('../utils/NotFoundError.js');

const ConflictError = require('../utils/ConflictError.js');
// eslint-disable-next-line import/extensions
const NotAuthorizate = require('../utils/NotAuthorizate.js');

// eslint-disable-next-line import/extensions
const HttpCodesCards = require('../utils/constants.js');

const generateToken = require('../utils/jwt.js');

// eslint-disable-next-line consistent-return
async function getUser(req, res) {
  try {
    const users = await User.find({});
    return res.send(users);
  } catch (err) {
    return res.status(500).send({ message: 'Ошибка сервера' });
  }
}

// eslint-disable-next-line consistent-return
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
    if (error.name === 'ValidationError') {
      next(new NotValidIdError('Переданы не валидные данные'));
      // eslint-disable-next-line consistent-return
      return;
    }
    if (error.name === 'NotFoundError') {
      next(new NotFoundError('Пользователь по заданному ID не найден'));
      // eslint-disable-next-line consistent-return
      return;
    }
    next(error);
  }
};

// eslint-disable-next-line consistent-return
const createUser = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    const soltRounds = 10;
    const hash = await bcrypt.hash(password, soltRounds);
    // eslint-disable-next-line no-dupe-keys
    const newUser = await User.create({ email, password: hash, name });
    return res.status(HttpCodesCards.create).send({
      // eslint-disable-next-line max-len
      name: newUser.name, email: newUser.email, id: newUser._id,
    });
  } catch (error) {
    if (error.code === HttpCodesCards.dublicate) {
      // eslint-disable-next-line no-undef
      next(new ConflictError('Такой пользователь уже существует'));
      // eslint-disable-next-line consistent-return
      return;
    }
    next(error);
  }
};

// eslint-disable-next-line consistent-return
const login = async (req, res, next) => {
  const { email, password, name } = req.body;
  try {
    const userAdmin = await User.findOne({ email, name }).select('+password').orFail(
      () => new Error('NotAuthantificate'),
    );
    const matched = await bcrypt.compare(password, userAdmin.password);
    if (!matched) {
      throw new Error('NotAuthantificate');
    }

    const token = generateToken({ _id: userAdmin._id });
    return res.status(HttpCodesCards.success).send(
      {
        // eslint-disable-next-line max-len
        name: userAdmin.name, email: userAdmin.email, id: userAdmin._id, token,
      },
    );
  } catch (error) {
    if (error.message === 'NotAuthantificate') {
      // eslint-disable-next-line no-undef
      next(new NotAuthorizate('Неверно введены данные'));
      // eslint-disable-next-line consistent-return
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
