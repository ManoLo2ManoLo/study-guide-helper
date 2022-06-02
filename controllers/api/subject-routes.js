const router = require('express').Router();
const { Subject } = require('../../Models');

router.get('/', (req, res) => {
    Subject.findAll()
    .then((dbSubjectData) => res.json(dbSubjectData))
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    })
})

module.exports = router