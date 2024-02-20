/* eslint-disable import/extensions */
const { Joi } = require('celebrate');

const { regexUrl } = require('../utils/regex.js');

const createMovieJoi = {
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().pattern(regexUrl).required(),
    trailerLink: Joi.string().pattern(regexUrl).required(),
    thumbnail: Joi.string().pattern(regexUrl).required(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
};

const deleteMovieJoi = {
  params: Joi.object().keys({
    _id: Joi.string().hex().length(24).required(),
  }),
};

const signUpJoi = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
};

const signInJoi = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
};

module.exports = {
  createMovieJoi,
  deleteMovieJoi,
  signUpJoi,
  signInJoi,
};
