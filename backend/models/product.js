const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Product = sequelize.define('Product', {
  productId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'product_id',
  },
  productName: {
    type: DataTypes.STRING(100),
    allowNull: false,
    field: 'product_name',
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING(255),
    allowNull: true,
    field: 'image_url',
  },
}, {
  tableName: 'products',
  timestamps: false,
});

const Category = require('./category');
Product.belongsTo(Category, {
  foreignKey: 'categoryId',
  as: 'category',
});
Category.hasMany(Product, {
  foreignKey: 'categoryId',
  as: 'products',
});

const Promotion = require('./promotion');
Product.belongsToMany(Promotion, {
  through: 'PromotionProduct',
  foreignKey: 'productId',
  otherKey: 'promotionId',
  as: 'promotions',
});
Promotion.belongsToMany(Product, {
  through: 'PromotionProduct',
  foreignKey: 'promotionId',
  otherKey: 'productId',
  as: 'products',
});

module.exports = Product;