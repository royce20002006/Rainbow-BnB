const router = require('express').Router();
const { restoreUser } = require('../../utils/auth');


//restore user middleware
router.use(restoreUser);














module.exports = router;