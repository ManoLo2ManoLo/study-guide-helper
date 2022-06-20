const router = require('express').Router();
const { User, Course, Subject, Section } = require('../../../models');
const withAuth = require('../../../utils/auth.js');

router.get('/', withAuth, (req, res) => {
    User.findOne({
        where: {
            id: req.session.user_id
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
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' });
        }

        const user = dbUserData.get({ plain: true });

        res.render('dashboard', {user});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;