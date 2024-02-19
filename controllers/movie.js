/* eslint-disable max-len */
/* eslint-disable no-else-return */
/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable import/extensions */
const Movie = require('../models/movie.js');

const NotDelete = require('../utils/NotDelete.js');

const NotValidIdError = require('../utils/NotValidIdError.js');

const NotFoundError = require('../utils/NotFoundError.js');

const HttpCodesCards = require('../utils/constants.js');

async function getMovies(req, res, next) {
  try {
    const owner = req.user._id;
    const movies = await Movie.find({ owner });
    return res.send(movies);
  } catch (error) {
    next(error);
  }
}

const deleteMovies = async (req, res, next) => {
  try {
    const { _id } = req.params;
    await Movie.findById(_id).orFail(
      () => new NotFoundError('Фильм по заданному ID не найден'),
    )
      .then((movie) => {
        if (movie.owner._id.toString() === req.user._id.toString()) {
          return Movie.findByIdAndDelete(_id)
            .then((movie) => res.status(HttpCodesCards.success).send(movie));
        } else {
          return next(new NotDelete('У вас нет прав на удаление данного фильма'));
        }
      });
  } catch (error) {
    if (error.name === 'NotFoundError') {
      next(new NotFoundError('Фильм по заданному ID не найден'));
      return;
    }
    if (error.name === 'CastError') {
      next(new NotValidIdError('Передан не валидный ID'));
      return;
    }
    next(error);
  }
};

const createMovies = async (req, res, next) => {
  try {
    const {
      country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, movieId,
    } = req.body;
    const owner = req.user._id;
    const newMovie = await Movie.create({
      country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, owner, movieId,
    });
    return res.status(HttpCodesCards.create).send(newMovie);
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new NotValidIdError('Переданы не валидные данные'));
      return;
    }
    next(error);
  }
};

module.exports = {
  getMovies,
  deleteMovies,
  createMovies,
};
