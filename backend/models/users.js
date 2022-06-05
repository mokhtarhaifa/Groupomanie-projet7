'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.users.hasMany(models.publications, {
        onDelete: "CASCADE",
        hooks:true}),
      models.users.hasMany(models.comments, {
        onDelete: "CASCADE",
        hooks:true});
    }
  }
  users.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
    adminRole: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};