const mongoose = require('mongoose');

const connectMongoDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI;
        
        if (!mongoURI) {
            console.warn('⚠️ MONGO_URI is not defined in environment variables.');
            return;
        }

        await mongoose.connect(mongoURI);
        console.log('Successfully connected to MongoDB for Activity Logs!');
    } catch (error) {
        console.error('MongoDB connection failure:', error);
    }
};

module.exports = connectMongoDB;