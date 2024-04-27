const jwt = require('jsonwebtoken');
const Employee = require('../models/employee');

exports.authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const employee = await Employee.findOne({
      where: { employeeId: decoded.employeeId },
    });

    if (!employee) {
      throw new Error();
    }

    req.token = token;
    req.employee = employee;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed' });
  }
};

exports.authorize = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.employee.role)) {
      return res.status(403).json({ message: 'Authorization failed' });
    }
    next();
  };
};