const router = require('express').Router();

const apiRoutes = require('./api');
const hbsRoutes = require('./hbs');

router.use('/api', apiRoutes);
router.use('/', hbsRoutes);

module.exports = router;