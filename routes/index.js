const Router = require('express');

const userRouter = require('./user');
const movieRouter = require('./movie');
const adminsRouter = require('./admins');

const auth = require('../middlewares/auth');

const router = Router();
router.use('/', adminsRouter);
router.use('/', auth, userRouter);
router.use('/', auth, movieRouter);

module.exports = router;
