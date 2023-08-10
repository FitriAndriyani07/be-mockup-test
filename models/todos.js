'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Todos.belongsTo(models.Users, {
        foreignKey: 'user_id',
        as: 'user'
      })
    }
  }
  Todos.init({
    user_id: DataTypes.INTEGER,
    todo: DataTypes.STRING,
    deadline: DataTypes.STRING,
    is_done: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Todos',
    tableName: 'todos',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return Todos;
};