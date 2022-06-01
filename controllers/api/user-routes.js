const router = require('express').Router();
const { User } = require('../../Models');

router.get('/', (req, res) => {
    User.findAll()
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    })
})

router.get('/:id', (req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        }
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

router.post('/', (req, res) => {
    User.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then((dbUserData) => { res.json(dbUserData) })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    })
})

module.exports = router;