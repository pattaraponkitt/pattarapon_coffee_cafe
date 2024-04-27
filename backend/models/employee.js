const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const bcrypt = require('bcrypt');

const Employee = sequelize.define('Employee', {
  employeeId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'employee_id',
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
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    field: 'created_at',
  },
}, {
  tableName: 'employees',
  timestamps: false,
  hooks: {
    beforeCreate: async (employee) => {
      const salt = await bcrypt.genSalt(10);
      employee.password = await bcrypt.hash(employee.password, salt);
    },
  },
});

Employee.prototype.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = Employee;