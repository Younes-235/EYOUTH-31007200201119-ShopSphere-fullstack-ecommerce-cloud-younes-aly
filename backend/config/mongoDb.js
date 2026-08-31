const mongoose = require('mongoose');

let cachedConnection = global.mongoose;

if (!cachedConnection) {
  cachedConnection = global.mongoose = { conn: null, promise: null };
}

const connectMongoDB = async () => {
  const mongoURI = process.env.MONGO_URI;

  if (!mongoURI) {
    console.warn('⚠️ MONGO_URI is not defined in environment variables.');
    return null;
  }

  if (cachedConnection.conn && mongoose.connection.readyState === 1) {
    return cachedConnection.conn;
  }

  if (!cachedConnection.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
    };

    cachedConnection.promise = mongoose.connect(mongoURI, opts).then((mongooseInstance) => {
      console.log('Successfully connected to MongoDB for Activity Logs!');
      return mongooseInstance;
    }).catch((err) => {
      cachedConnection.promise = null;
      console.error('MongoDB connection failure:', err);
      throw err;
    });
  }

  try {
    cachedConnection.conn = await cachedConnection.promise;
  } catch (e) {
    cachedConnection.promise = null;
    throw e;
  }

  return cachedConnection.conn;
};

module.exports = connectMongoDB;