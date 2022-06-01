const User = require('./User');
const Subject = require('./Subject');
const Course = require('./Course');
const Section = require('./Section');
const Question = require('./Question')

User.hasMany(Course, {
    foreignKey: 'user_id'
});

Course.belongsTo(User, {
    foreignKey: 'user_id'
});

Course.hasMany(Section, {
    foreignKey: 'course_id',
    onDelete: 'SET NULL'
});

Section.belongsTo(Course, {
    foreignKey: 'course_id',
    onDelete: 'SET NULL'
});

Section.hasMany(Question, {
    foreignKey: 'section_id',
    onDelete: 'SET NULL'
});

Question.belongsTo(Section, {
    foreignKey: 'section_id',
    onDelete: 'SET NULL'
});

Subject.hasMany(Course, {
    foreignKey: 'subject_id',
    onDelete: 'SET NULL'
});

Course.belongsTo(Subject, {
    foreignKey: 'subject_id',
    onDelete: 'SET NULL'
})

module.exports = { User, Subject, Course, Section, Question }