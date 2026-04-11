require('dotenv').config();
require('express-async-errors'); // Global async error wrapper handling rejections
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Main Root Route
app.get('/api', (req, res) => {
  res.json({ message: 'LotusPlanet API is running 🌿' });
});

// Health Check — hit this after deployment to verify Atlas is connected
const mongoose = require('mongoose');
app.get('/api/health', (req, res) => {
  const dbState = mongoose.connection.readyState;
  const states = { 0: 'disconnected', 1: 'connected', 2: 'connecting', 3: 'disconnecting' };
  res.json({
    status: dbState === 1 ? 'healthy' : 'unhealthy',
    server: 'running',
    database: states[dbState] || 'unknown',
    dbHost: mongoose.connection.host || 'not connected',
    uptime: Math.floor(process.uptime()) + 's',
    environment: process.env.NODE_ENV || 'development'
  });
});

// Mount modular routing architecture
app.use('/api/auth', require('./src/routes/auth.routes'));
app.use('/api/products', require('./src/routes/product.routes'));
app.use('/api/categories', require('./src/routes/category.routes'));
app.use('/api/orders', require('./src/routes/order.routes'));
app.use('/api/upload', require('./src/routes/upload.routes'));
app.use('/api/settings', require('./src/routes/settings.routes'));

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  const status = err.statusCode || 500;
  res.status(status).json({
    success: false,
    message: err.message || 'Server Error'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
