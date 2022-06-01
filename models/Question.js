const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Question extends Model {}

 Question.init(
     {
         id: {
             type: DataTypes.INTEGER,
             allowNull: false,
             autoIncrement: true,
             primaryKey: true
         },

         question: {
             type: DataTypes.STRING,
             allowNull: false
         },

         answer: {
             type: DataTypes.STRING,
             allowNull: false
         }
     },
     {
         sequelize,
         freezeTableName: true,
         underscored: true,
         modelName: 'question'
     }
 );

 module.exports = Question;