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
    .then((dbUserData) => res.json(dbUserData))
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
    .then((dbUserData) => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }

        res.json(dbUserData);
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
    .then((dbUserData) => { res.json(dbUserData) })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    })
})

module.exports = router;