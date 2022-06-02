const router = require('express').Router();
const { Question, Section } = require('../../Models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    Question.findAll({
        attributes: {
            exclude: ['section_id']
        },
        include: [
            {
                model: Section,
                attributes: [
                    'id',
                    'section_name'
                ]
            }
        ]
    })
    .then((dbQuestionData) => res.json(dbQuestionData))
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    })
})

router.get('./:id', (req, res) => {
    Question.findOne({
        where: {
            id: req.params.id
        },
        attributes: {
            exclude: ['section_id']
        },
        include: [
            {
                model: Section,
                attributes: [
                    'id',
                    'section_name'
                ]
            }
        ]
    })
    .then((dbQuestionData) => {
        if (!dbQuestionData) {
            res.status(404).json({ message: 'No question found with this id' });
            return;
        }

        res.json(dbQuestionData);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    })
})

router.post('/', withAuth, (req, res) => {
    Question.create({
        question: req.body.question,
        answer: req.body.answer,
        section_id: req.body.section_id
    })
    .then((dbQuestionData) => { res.json(dbQuestionData) })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    })
})

module.exports = router;