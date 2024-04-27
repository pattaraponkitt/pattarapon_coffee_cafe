const { Sequelize } = require('sequelize');

// สร้างการเชื่อมต่อกับฐานข้อมูล MySQL
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'mysql',
  logging: false,
});

// ตรวจสอบการเชื่อมต่อกับฐานข้อมูล
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to the database');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

// ซิงค์โมเดลกับฐานข้อมูล
const syncDB = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Database synchronized');
  } catch (error) {
    console.error('Unable to synchronize the database:', error);
    process.exit(1);
  }
};

module.exports = {
  sequelize,
  connectDB,
  syncDB,
};