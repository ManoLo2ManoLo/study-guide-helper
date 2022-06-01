const router = require('express').Router();

const userRoutes = require('./user-routes');
const subjectRoutes = require('./subject-routes');
const courseRoutes = require('./course-routes');
const sectionRoutes = require('./section-routes');

router.use('/users', userRoutes);
router.use('/subjects', subjectRoutes);
router.use('/courses', courseRoutes);
router.use('/sections', sectionRoutes);

module.exports = router;