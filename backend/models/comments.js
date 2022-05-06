'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.comments.belongsTo(models.users,{
        foreignKey: {
          allowNull: false
        }, onDelete: 'CASCADE',
      }),
      models.comments.belongsTo(models.publications, {
        foreignKey: {
          allowNull: false
        }, onDelete: 'CASCADE',
      })
    }
  }
  comments.init({
    content: DataTypes.TEXT,
    likes: DataTypes.INTEGER,
    dislikes: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'comments',
  });
  return comments;
};