const router = require('express').Router();
const withAuth = require('../../../utils/auth.js');

router.get('/', withAuth, (req, res) => {
    res.render('dashboard');
})

module.exports = router;