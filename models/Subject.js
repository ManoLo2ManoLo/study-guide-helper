const { Model, DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/connectoin');

class Subject extends Model {}

Subject.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },

        subject_name: {
            type: Sequelize.ENUM('Arts and Humanities', 'Language', 'Math', 'Science', 'Social Science', 'Other'),
            validate: {
                unique: true
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'subject'
    }
);

module.exports = Score;