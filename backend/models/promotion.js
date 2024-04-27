const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Promotion = sequelize.define('Promotion', {
  promotionId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'promotion_id',
  },
  promotionName: {
    type: DataTypes.STRING(100),
    allowNull: false,
    field: 'promotion_name',
  },
  discountRate: {
    type: DataTypes.DECIMAL(4, 2),
    allowNull: true,
    field: 'discount_rate',
  },
  startDate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
    field: 'sta