const express = require('express');
const router = express.Router();
const apiRouter = require('./api');


//allows developer to re-set the CSRF token cookie
router.get('/api/csrf/restore', (req, res, next) => {
    const csrfToken = req.csrfToken();
    res.cookie('XSRF-TOKEN', csrfToken);
    res.status(200).json({
        'XSRF-Token': csrfToken
    });
});


// apirouter middleware to use apirouter
router.use('/api', apiRouter);

module.exports = router;