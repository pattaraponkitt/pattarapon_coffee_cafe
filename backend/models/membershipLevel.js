const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const MembershipLevel = sequelize.define('MembershipLevel', {
  levelId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'level_id',
  },
  levelName: {
    type: DataTypes.STRING(50),
    allowNull: false,
    field: 'level_name',
  },
  discountRate: {
    type: DataTypes.DECIMAL(4, 2),
    allowNull: false,
    field: 'discount_rate',
  },
  minimumPoints: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'minimum_points',
  },
}, {
  tableName: 'membership_levels',
  timestamps: false,
});

const Customer = require('./customer');
MembershipLevel.belongsToMany(Customer, {
  through: 'CustomerMembership',
  foreignKey: 'levelId',
  otherKey: 'customerId',
  as: 'customers',
});
Customer.belongsToMany(MembershipLevel, {
  through: 'CustomerMembership',
  foreignKey: 'customerId',
  otherKey: 'levelId',
  as: 'membershipLevels',
});

module.exports = MembershipLevel;