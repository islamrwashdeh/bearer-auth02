'use strict';

require('dotenv').config();


const { Sequelize, DataTypes } = require('sequelize');
const userSchema = require('./users.js');


const POSTGRES_URI = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL;

let sequelizeOptions = process.env.NODE_ENV === 'production' ? {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        }
    }
} : {};

let sequelize = new Sequelize(POSTGRES_URI, sequelizeOptions);

module.exports = {
    db: sequelize,
    Users: Users(sequelize, DataTypes),
}