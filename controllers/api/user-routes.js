const router = require('express').Router();
const { User, Course, Subject, Section, Question } = require('../../Models');

router.get('/', (req, res) => {
    User.findAll({
        attributes: {
            exclude: ['password']
        },
        include: [
            {
                model: Course,
                attributes: [ 'id', 'course_name' ],
                include: [
                    {
                        model: Subject,
                        attributes: [ 'id', 'subject_name' ],
                    },
                    {
                        model: Section,
                        attributes: [ 'id', 'section_name' ],
                        include: [
                            {
                                model: Question,
                                attributes: [ 'id', 'question', 'answer' ]
                            }
                        ]
                    }
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
    User.findOne({
        where: {
            id: req.params.id
        },
        attributes: {
            exclude: ['password']
        },
        include: [
            {
                model: Course,
                attributes: [ 'id', 'course_name' ],
                include: [
                    {
                        model: Subject,
                        attributes: [ 'id', 'subject_name' ]
                    },
                    {
                        model: Section,
                        attributes: [ 'id', 'section_name' ]
                    }
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

router.post('/', (req, res) => {
    User.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then((dbUserData) => { 
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;
            res.json(dbUserData);
        })
     })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    })
})

router.post('/login', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then((dbUserData) => {
        if (!dbUserData){
            res.status(400).json({ message: 'No user exists witht this email address!'})
        }

        const validPassword = dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            console.log('logged in')
            res.status(400).json({ message: 'Incorrect password entered' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;
            res.json({ user: dbUserData, message: 'You are now logged in!'});
        })
    })
})

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        })
    } else {
        res.status(404).end();
    }
})

module.exports = router;