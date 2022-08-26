const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class employee extends Model {} 

employee.init( {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey : true,
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role : {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role_id : {
    type: DataTypes.INTEGER,
    allowNull: true,
    
  },

  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'employee',
  }
)

module.exports = employee;