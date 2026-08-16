require('dotenv').config();

const app = require("./app.js");
const connectMongoDB = require('./config/mongoDb.js');

connectMongoDB().catch(err => {
  console.error('💥 Failed to connect to MongoDB:', err);
});

module.exports = app;

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Express e-commerce server is running on port ${PORT}`);
  });
}