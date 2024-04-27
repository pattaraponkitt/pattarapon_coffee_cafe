const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const MaterialCategory = sequelize.define('MaterialCategory', {
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
  tableName: 'material_categories',
  timestamps: false,
});

const RawMaterial = require('./rawMaterial');
MaterialCategory.hasMany(RawMaterial, {
  foreignKey: 'categoryId',
  as: 'rawMaterials',
});
RawMaterial.belongsTo(MaterialCategory, {
  foreignKey: 'categoryId',
  as: 'category',
});

module.exports = MaterialCategory;