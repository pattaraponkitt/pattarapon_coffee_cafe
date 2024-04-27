const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const RawMaterial = sequelize.define('RawMaterial', {
  materialId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'material_id',
  },
  materialName: {
    type: DataTypes.STRING(100),
    allowNull: false,
    field: 'material_name',
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  unit: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  quantity: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  lowThreshold: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    field: 'low_threshold',
  },
}, {
  tableName: 'raw_materials',
  timestamps: false,
});

const MaterialCategory = require('./materialCategory');
RawMaterial.belongsTo(MaterialCategory, {
  foreignKey: 'categoryId',
  as: 'category',
});
MaterialCategory.hasMany(RawMaterial, {
  foreignKey: 'categoryId',
  as: 'rawMaterials',
});

const Recipe = require('./recipe');
RawMaterial.hasMany(Recipe, {
  foreignKey: 'materialId',
  as: 'recipes',
});
Recipe.belongsTo(RawMaterial, {
  foreignKey: 'materialId',
  as: 'rawMaterial',
});

module.exports = RawMaterial;