const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {
    checkPassword(loginPassword) {
        return bcrypt.compareSynce(loginPassword, this.password);
    }
};

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },

        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                minLength: 3,
                maxLength: 20
            }
        },

        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                minLength: 3,
                maxLength: 20
            }
        },

        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                minLength: 4,
                maxLength: 20,
                unique: true
            }
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                minLength: 6,
                maxLength: 16
            }
        }
    },
    {
        hooks: {
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },

            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
);

module.exports = User;