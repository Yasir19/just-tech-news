const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our User Model 
class User extends Model{}

// define table columns and configration 
User.init(
    {
        // define an id column
        id: {
            // use the special Sequelize DataTypes object provide what type of data it is
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        //define a username colum
        username: {
            type: DataTypes.STRING,
            allowNull:false,
        },
        //define an email column
        email :{
            type: DataTypes.STRING,
            allowNull: false,
            // ensure the email is unique 
            unique: true,
            //validate 
            validate: { 
                isEmail: true
            }
        },
        // define a password column
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate : {
                len: [8]
            }
        }
    },
    {
        //configure table option 
        sequelize,
        timestamps : false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
 
    }
);

module.exports = User;