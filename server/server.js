require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');
const { PORT } = require('./config/constants');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', routes);

// Root endpoint
app.get('/', (req, res) => {
    res.send('Roadmap Todo API is running (MongoDB)');
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    const mongoose = require('mongoose');
    const dbStatus = mongoose.connection.readyState;
    const dbStates = {
        0: 'disconnected',
        1: 'connected',
        2: 'connecting',
        3: 'disconnecting'
    };
    
    res.json({
        status: dbStatus === 1 ? 'healthy' : 'unhealthy',
        database: dbStates[dbStatus] || 'unknown',
        timestamp: new Date().toISOString()
    });
});

// Error handler middleware (must be last)
app.use(errorHandler);

// Connect Database and Start Server
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('❌ Failed to start server:', err);
        process.exit(1);
    });
