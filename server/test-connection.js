// Quick test script to check MongoDB connection
require('dotenv').config();
const mongoose = require('mongoose');

const testConnection = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/roadmap-todo-app';
        console.log('🔄 Testing MongoDB connection...');
        console.log('📍 URI:', mongoURI.replace(/\/\/.*@/, '//***:***@'));
        
        await mongoose.connect(mongoURI);
        console.log('✅ MongoDB connection successful!');
        
        // Test query
        const Task = require('./models/Task');
        const count = await Task.countDocuments();
        console.log(`📊 Found ${count} tasks in database`);
        
        await mongoose.disconnect();
        console.log('✅ Connection test completed');
        process.exit(0);
    } catch (err) {
        console.error('❌ Connection failed:', err.message);
        console.error('\nPossible issues:');
        console.error('  1. MongoDB is not running');
        console.error('  2. Connection string is incorrect');
        console.error('  3. Network/firewall blocking connection');
        process.exit(1);
    }
};

testConnection();

