const router = require('express').Router();

// test route
router.post('/test', (req, res, next) => {
    try {
        res.json({requesBody: req.body})
    } catch (error) {
        console.log(error)
    }
});





module.exports = router;