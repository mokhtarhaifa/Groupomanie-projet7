'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class publications extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.publications.belongsTo(models.users,{
        foreignKey: {
          allowNull: true
        }, onDelete: 'CASCADE',
      }),
      models.publications.hasMany(models.comments, {
        foreignKey: {
          allowNull: false
        }, onDelete: 'CASCADE',
        hooks:true
      })
    }
  }
  publications.init({
    content: DataTypes.TEXT,
    imgUrl: DataTypes.STRING,
    likes: DataTypes.INTEGER,
    dislikes: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'publications',
  });

  
  return publications;
};