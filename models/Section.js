const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Section extends Model {}

Section.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: truw,
            primaryKey: true
        },

        section_name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'section'
    }
)

module.exports = Section;