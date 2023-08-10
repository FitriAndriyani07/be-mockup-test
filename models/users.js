'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Users.hasMany(models.Todos, {
        foreignKey: 'user_id',
        as: 'todos'
      })
    }
  }
  Users.init({
    name: DataTypes.STRING,
    login_key: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Users',
    tableName: 'users',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return Users;
};