const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class departments extends Model {}

departments.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      primaryKey : true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'departments',
  }
)





module.exports = departments;