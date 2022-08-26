const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class roles extends Model {}

roles.init( 
  {
  job_title: {
    type: DataTypes.STRING,
    allowNull : false,
    },
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  }, 
  departments_id : {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
    model: 'departments',
    key: 'id',
  }},
  department: {
    type: DataTypes.STRING,
  },
  salary : {
    type: DataTypes.INTEGER,
    allowNull: false,
  }, 
},
{
  sequelize,
  freezeTableName: true,
  underscored: true,
  modelName: 'roles',
}
)

module.exports = roles;