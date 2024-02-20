/* eslint-disable import/extensions */
const Router = require('express');

const { celebrate } = require('celebrate');

const {
  getMovies,
  createMovies,
  deleteMovies,
} = require('../controllers/movie.js');

const { createMovieJoi, deleteMovieJoi } = require('../joi/joi.js');

const movieRouter = Router();
movieRouter.get('/movies', getMovies);
movieRouter.post('/movies', celebrate(createMovieJoi), createMovies);
movieRouter.delete('/movies/:_id', celebrate(deleteMovieJoi), deleteMovies);

module.exports = movieRouter;
