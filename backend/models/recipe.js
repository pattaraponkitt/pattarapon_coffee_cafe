const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Recipe = sequelize.define('Recipe', {
  recipeId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'recipe_id',
  },
  quantity: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
}, {
  tableName: 'recipes',
  timestamps: false,
});

const Product = require('./product');
Recipe.belongsTo(Product, {
  foreignKey: 'productId',
  as: 'product',
});
Product.hasMany(Recipe, {
  foreignKey: 'productId',
  as: 'recipes',
});

const RawMaterial = require('./rawMaterial');
Recipe.belongsTo(RawMaterial, {
  foreignKey: 'materialId',
  as: 'rawMaterial',
});
RawMaterial.hasMany(Recipe, {
  foreignKey: 'materialId',
  as: 'recipes',
});

module.exports = Recipe;