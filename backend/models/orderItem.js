const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const OrderItem = sequelize.define('OrderItem', {
  itemId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'item_id',
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  discount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    defaultValue: 0,
  },
}, {
  tableName: 'order_items',
  timestamps: false,
});

const Order = require('./order');
OrderItem.belongsTo(Order, {
  foreignKey: 'orderId',
  as: 'order',
});
Order.hasMany(OrderItem, {
  foreignKey: 'orderId',
  as: 'orderItems',
});

const Product = require('./product');
OrderItem.belongsTo(Product, {
  foreignKey: 'productId',
  as: 'product',
});
Product.hasMany(OrderItem, {
  foreignKey: 'productId',
  as: 'orderItems',
});

module.exports = OrderItem;