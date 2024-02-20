/* eslint-disable import/extensions */
const { json } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const router = require('./routes');

const NotFoundError = require('./utils/NotFoundError.js');

const error = require('./utils/error.js');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, dataMovies = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

const app = express();

mongoose.connect(dataMovies);

app.use(json());

app.use(router);

app.use('*', () => {
  throw new NotFoundError('Такой страницы не существует');
});

app.use(requestLogger);

app.use(errorLogger);

app.use(errors());

app.use(error);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
