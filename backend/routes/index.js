const express = require('express');
const router = express.Router();

//allows developer to re-set the CSRF token cookie
router.get('/api/csrf/restore', (req, res, next) => {
    const csrfToken = req.csrfToken();
    res.cookie('XSRF-TOKEN', csrfToken);
    res.status(200).json({
        'XSRF-Token': csrfToken
    });
});

module.exports = router;