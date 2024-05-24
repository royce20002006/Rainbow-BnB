const router = require('express').Router();
const sessionRouter = require('./session');
const usersRouter = require('./users');
const { restoreUser } = require('../../utils/auth');
const { sequelize } = require('../../db/models');
const  spotsRouter  = require('./spots');
const reviewsRouter = require('./reviews');

//restore user middleware
router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/spots', spotsRouter)

router.use('/reviews', reviewsRouter);

router.post('/test', (req, res) => {
    res.json({requestBody: req.body });
});

module.exports = router;