const router = require('express').Router();

const userRoutes = require('./user-routes');
const subjectRoutes = require('./subject-routes');
const courseRoutes = require('./course-routes');
const sectionRoutes = require('./section-routes');
const questionRoutes = require('./question-routes');

router.use('/users', userRoutes);
router.use('/subjects', subjectRoutes);
router.use('/courses', courseRoutes);
router.use('/sections', sectionRoutes);
router.use('/questions', questionRoutes);

module.exports = router;