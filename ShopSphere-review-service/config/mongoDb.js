const mongoose = require('mongoose');

const connectMongoDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI;
        
        await mongoose.connect(mongoURI);
        console.log('Review service successfully connected to MongoDB!');
    } catch (error) {
        console.error('MongoDB connection failure:', error);
        process.exit(1);
    }
};

module.exports = connectMongoDB;