const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/database');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Import routes
const categoryRoutes = require('./routes/categoryRoutes');
const customerRoutes = require('./routes/customerRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const materialCategoryRoutes = require('./routes/materialCategoryRoutes');
const membershipLevelRoutes = require('./routes/membershipLevelRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentMethodRoutes = require('./routes/paymentMethodRoutes');
const productRoutes = require('./routes/productRoutes');
const promotionRoutes = require('./routes/promotionRoutes');
const rawMaterialRoutes = require('./routes/rawMaterialRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const roleRoutes = require('./routes/roleRoutes');

// Create Express app
const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/categories', categoryRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/material-categories', materialCategoryRoutes);
app.use('/api/membership-levels', membershipLevelRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payment-methods', paymentMethodRoutes);
app.use('/api/products', productRoutes);
app.use('/api/promotions', promotionRoutes);
app.use('/api/raw-materials', rawMaterialRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/roles', roleRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
 console.log(`Server is running on port ${PORT}`);
});