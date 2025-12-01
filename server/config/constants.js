// Validate critical environment variables in production
const isProduction = process.env.NODE_ENV === 'production';

if (isProduction) {
    if (!process.env.JWT_SECRET || process.env.JWT_SECRET === 'your-secret-key-change-in-production') {
        throw new Error('JWT_SECRET must be set in production environment');
    }
    if (!process.env.ADMIN_PASSWORD || process.env.ADMIN_PASSWORD === 'admin123') {
        throw new Error('ADMIN_PASSWORD must be changed in production environment');
    }
    if (!process.env.MONGODB_URI) {
        throw new Error('MONGODB_URI must be set in production environment');
    }
}

module.exports = {
    PORT: process.env.PORT || 5000,
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/roadmap-todo-app',
    // Use environment variables or fallback to development defaults
    // WARNING: Change these in production via environment variables!
    JWT_SECRET: process.env.JWT_SECRET || 'dev-secret-key-change-in-production',
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || 'admin123',
    NODE_ENV: process.env.NODE_ENV || 'development'
};

