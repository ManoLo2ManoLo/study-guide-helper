const router = require('express').Router();
const { Course, Subject, User, Section } = require('../../Models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    Course.findAll({
        attributes: {
            exclude: ['user_id', 'subject_id']
        },

        include: [
            {
                model: User,
                attributes: [
                    'id',
                    'username'
                ]
            },
            {
                model: Subject,
                attributes: [
                    'id',
                    'subject_name'
                ]
            },
            {
                model: Section,
                attributes: [
                    'id',
                    'section_name'
                ]
            }
        ]
    })
    .then((dbCourseData) => res.json(dbCourseData))
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    })
})

router.get('/:id', (req, res) => {
    Course.findOne({
        where: {
            id: req.params.id
        },
        attributes: {
            exclude: ['user_id', 'subject_id']
        },

        include: [
            {
                model: User,
                attributes: [
                    'id',
                    'username'
                ]
            },
            {
                model: Subject,
                attributes: [
                    'id',
                    'subject_name'
                ]
            },
            {
                model: Section,
                attributes: [
                    'id',
                    'section_name'
                ]
            }
        ]
    })
    .then((dbCourseData) => {
        if (!dbCourseData) {
            res.status(404).json({ message: 'No course found with this id' });
            return;
        }

        res.json(dbCourseData);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    })
})

router.post('/', withAuth, (req, res) => {
    Course.create({
        course_name: req.body.course_name,
        subject_id: req.body.subject_id,
        user_id: req.session.user_id
    })
    .then((dbCourseData) => { res.json(dbCourseData) })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    })
})

module.exports = router;