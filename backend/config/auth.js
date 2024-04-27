const jwt = require('jsonwebtoken');

// สร้าง JWT token
const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
};

// ตรวจสอบ JWT token
const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

// Middleware สำหรับตรวจสอบ JWT token
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = verifyToken(token.replace('Bearer ', ''));
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// Middleware สำหรับตรวจสอบสิทธิ์ผู้ใช้
const authorize = (roles) => {
  return (req, res, next) => {
    const userRole = req.user.role;

    if (!roles.includes(userRole)) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    next();
  };
};

module.exports = {
  generateToken,
  verifyToken,
  authMiddleware,
  authorize,
};