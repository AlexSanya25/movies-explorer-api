const Router = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
const { celebrate } = require('celebrate');

const {
  getMovies,
  createMovies,
  deleteMovies,
// eslint-disable-next-line import/extensions
} = require('../controllers/movie.js');

// eslint-disable-next-line import/extensions
const { createMovieJoi, deleteMovieJoi } = require('../joi/joi.js');

const movieRouter = Router();
movieRouter.get('/movies', getMovies);
movieRouter.post('/movies', celebrate(createMovieJoi), createMovies);
movieRouter.delete('/movies/:_id', celebrate(deleteMovieJoi), deleteMovies);

module.exports = movieRouter;
