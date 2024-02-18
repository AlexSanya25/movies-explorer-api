/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');
// eslint-disable-next-line import/no-extraneous-dependencies
const validator = require('validator');

// eslint-disable-next-line import/extensions
const { regexUrl } = require('../utils/regex.js');

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      validate: {
        validator: (url) => regexUrl.test(url),
        message: 'Введен некорректный адрес ссылки',
      },
    },
    trailerLink: {
      type: String,
      required: true,
      validate: {
        validator: (url) => regexUrl.test(url),
        message: 'Введен некорректный адрес ссылки',
      },
    },
    thumbnail: {
      type: String,
      required: true,
      validate: {
        validator: (url) => regexUrl.test(url),
        message: 'Введен некорректный адрес ссылки',
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    movieId: {
      type: Number,
      required: true,
    },
    nameRU: {
      type: String,
      required: true,
    },
    nameEN: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

module.exports = mongoose.model('movie', movieSchema);
