const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Category = sequelize.define('Category', {
  categoryId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'category_id',
  },
  categoryName: {
    type: DataTypes.STRING(50),
    allowNull: false,
    field: 'category_name',
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'categories',
  timestamps: false,
});

// Associations
const Product = require('./product');
Category.hasMany(Product, {
  foreignKey: 'categoryId',
  as: 'products',
});
Product.belongsTo(Category, {
  foreignKey: 'categoryId',
  as: 'category',
});

module.exports = Category;