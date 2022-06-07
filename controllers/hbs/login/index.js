const router = require('express').Router();
const withNoAuth = require('../../../utils/noauth.js');

router.get('/', withNoAuth, (req, res) => {
    res.render('login')
})

module.exports = router;