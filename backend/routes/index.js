const express = require('express');
const router = express.Router();
const apiRouter = require('./api');

// apirouter middleware to use apirouter
router.use('/api', apiRouter);

//allows developer to re-set the CSRF token cookie
router.get('/api/csrf/restore', (req, res, next) => {
    const csrfToken = req.csrfToken();
    res.cookie('XSRF-TOKEN', csrfToken);
    res.status(200).json({
        'XSRF-Token': csrfToken
    });
});

module.exports = router;