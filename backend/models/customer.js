const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Customer = sequelize.define('Customer', {
  customerId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'customer_id',
  },
  firstName: {
    type: DataTypes.STRING(50),
    allowNull: false,
    field: 'first_name',
  },
  lastName: {
    type: DataTypes.STRING(50),
    allowNull: false,
    field: 'last_name',
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    field: 'created_at',
  },
}, {
  tableName: 'customers',
  timestamps: false,
});

// Associations
const Order = require('./order');
Customer.hasMany(Order, {
  foreignKey: 'customerId',
  as: 'orders',
});
Order.belongsTo(Customer, {
  foreignKey: 'customerId',
  as: 'customer',
});

const MembershipLevel = require('./membershipLevel');
Customer.belongsToMany(MembershipLevel, {
  through: 'CustomerMembership',
  foreignKey: 'customerId',
  otherKey: 'levelId',
  as: 'membershipLevels',
});
MembershipLevel.belongsToMany(Customer, {
  through: 'CustomerMembership',
  foreignKey: 'levelId',
  otherKey: 'customerId',
  as: 'customers',
});

module.exports = Customer;