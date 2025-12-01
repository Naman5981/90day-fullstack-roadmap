const mongoose = require('mongoose');
const { MONGODB_URI } = require('./constants');

const connectDB = async () => {
    try {
        const mongoURI = MONGODB_URI;

        console.log('🔄 Attempting to connect to MongoDB...');
        console.log('📍 Connection string:', mongoURI.replace(/\/\/.*@/, '//***:***@'));

        await mongoose.connect(mongoURI);
        console.log('✅ MongoDB connected successfully');
        console.log('📊 Database name:', mongoose.connection.db.databaseName);
    } catch (err) {
        console.error('❌ MongoDB Connection Error:', err.message);
        console.error('Full error:', err);
        console.error('\n💡 Troubleshooting tips:');
        console.error('   1. Make sure MongoDB is running (run: mongod)');
        console.error('   2. Check your MONGODB_URI in .env file');
        console.error('   3. If using MongoDB Atlas, verify your connection string');
        process.exit(1);
    }
};

module.exports = connectDB;

