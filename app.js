const { json } = require('express');
const express = require('express');
const mongoose = require('mongoose');

const router = require('./routes');

// eslint-disable-next-line import/extensions
const NotFoundError = require('./utils/NotFoundError.js');

// eslint-disable-next-line import/extensions
const error = require('./utils/error.js');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb');

app.use(json());

app.use(requestLogger);

app.use(router);

app.use(errorLogger);

app.use('*', () => {
  throw new NotFoundError('Такой страницы не существует');
});

app.use(error);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
