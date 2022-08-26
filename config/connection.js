const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_Info,
  {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    logging: false,
  },
);

module.exports = sequelize;