const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Order = sequelize.define('Order', {
  orderId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'order_id',
  },
  orderStatus: {
    type: DataTypes.STRING(20),
    allowNull: false,
    field: 'order_status',
  },
  orderDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    field: 'order_date',
  },
}, {
  tableName: 'orders',
  timestamps: false,
});

const Customer = require('./customer');
Order.belongsTo(Customer, {
  foreignKey: 'customerId',
  as: 'customer',
});
Customer.hasMany(Order, {
  foreignKey: 'customerId',
  as: 'orders',
});

const Employee = require('./employee');
Order.belongsTo(Employee, {
  foreignKey: 'employeeId',
  as: 'employee',
});
Employee.hasMany(Order, {
  foreignKey: 'employeeId',
  as: 'orders',
});

const PaymentMethod = require('./paymentMethod');
Order.belongsTo(PaymentMethod, {
  foreignKey: 'paymentMethodId',
  as: 'paymentMethod',
});
PaymentMethod.hasMany(Order, {
  foreignKey: 'paymentMethodId',
  as: 'orders',
});

const OrderItem = require('./orderItem');
Order.hasMany(OrderItem, {
  foreignKey: 'orderId',
  as: 'orderItems',
});
OrderItem.belongsTo(Order, {
  foreignKey: 'orderId',
  as: 'order',
});

module.exports = Order;