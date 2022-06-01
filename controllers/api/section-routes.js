const router = require('express').Router();
const { Section, Course } = require('../../Models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    Section.findAll({
        attributes: {
            exclude: ['subject_id']
        },

        include: [
            {
                model: Course,
                attributes: [
                    'id',
                    'course_name'
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
    Section.findOne({
        where: {
            id: req.params.id
        },
        attributes: {
            exclude: ['subject_id']
        },
        include: [
            {
                model: Course,
                attributes: [
                    'id',
                    'course_name'
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
    Section.create({
        section_name: req.body.section_name,
        course_id: req.body.course_id,
    })
    .then((dbUserData) => { res.json(dbUserData) })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    })
})

module.exports = router;