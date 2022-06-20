const router = require('express').Router();

const homeRoutes = require('./home');
const loginRoutes = require('./login');
const signupRoutes = require('./signup');
const dashboardRoutes = require('./dashboard');

router.use('/', homeRoutes);
router.use('/login', loginRoutes);
router.use('/signup', signupRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;
