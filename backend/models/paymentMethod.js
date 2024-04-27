const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const PaymentMethod = sequelize.define('PaymentMethod', {
  methodId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'method_id',
  },
  methodName: {
    type: DataTypes.STRING(50),
    allowNull: false,
    field: 'method_name',
  },
}, {
  tableName: 'payment_methods',
  timestamps: false,
});

const Order = require('./order');
PaymentMethod.hasMany(Order, {
  foreignKey: 'paymentMethodId',
  as: 'orders',
});
Order.belongsTo(PaymentMethod, {
  foreignKey: 'paymentMethodId',
  as: 'paymentMethod',
});

module.exports = PaymentMethod;