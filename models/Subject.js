const { Model, DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/connection');

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
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'subject'
    }
);

module.exports = Subject;