const router = require('express').Router();

const homeRoutes = require('./home');
const loginRoutes = require('./login');
const signupRoutes = require('./signup');

router.use('/', homeRoutes);
router.use('/login', loginRoutes);
router.use('/signup', signupRoutes);

module.exports = router;
