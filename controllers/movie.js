// eslint-disable-next-line import/extensions
const Movie = require('../models/movie.js');

// eslint-disable-next-line import/extensions
const NotDelete = require('../utils/NotDelete.js');
// eslint-disable-next-line import/no-unresolved, import/extensions
const NotValidIdError = require('../utils/NotValidIdError.js');
// eslint-disable-next-line import/extensions
const NotFoundError = require('../utils/NotFoundError.js');

// eslint-disable-next-line import/extensions
const HttpCodesCards = require('../utils/constants.js');

// eslint-disable-next-line consistent-return
async function getMovies(req, res, next) {
  try {
    const movies = await Movie.find({});
    return res.send(movies);
  } catch (error) {
    next(error);
  }
}
// eslint-disable-next-line consistent-return
const deleteMovies = async (req, res, next) => {
  try {
    const { _id } = req.params;
    await Movie.findById(_id).orFail(
      () => new NotFoundError('Фильм по заданному ID не найден'),
    )
    // eslint-disable-next-line no-shadow, consistent-return
      .then((movie) => {
        if (movie.owner._id.toString() === req.user._id.toString()) {
          // eslint-disable-next-line max-len, no-shadow
          return Movie.findByIdAndDelete(_id)
            // eslint-disable-next-line no-shadow
            .then((movie) => res.status(HttpCodesCards.success).send(movie));
        // eslint-disable-next-line no-else-return
        } else {
          return next(new NotDelete('У вас нет прав на удаление данного фильма'));
        }
      });
  } catch (error) {
    if (error.name === 'NotFoundError') {
      // eslint-disable-next-line no-undef
      next(new NotFoundError('Фильм по заданному ID не найден'));
      // eslint-disable-next-line consistent-return
      return;
    }
    if (error.name === 'CastError') {
      next(new NotValidIdError('Передан не валидный ID'));
      // eslint-disable-next-line consistent-return
      return;
    }
    next(error);
  }
};

// eslint-disable-next-line consistent-return
const createMovies = async (req, res, next) => {
  try {
    const {
      // eslint-disable-next-line max-len
      country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, movieId,
    } = req.body;
    const owner = req.user._id;
    const newMovie = await Movie.create({
      // eslint-disable-next-line max-len
      country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, owner, movieId,
    });
    return res.status(HttpCodesCards.create).send(newMovie);
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new NotValidIdError('Переданы не валидные данные'));
      // eslint-disable-next-line consistent-return
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
