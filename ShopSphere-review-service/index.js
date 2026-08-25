require('dotenv').config();

const app = require('./app.js');
const connectMongoDB = require('./config/mongoDb.js');

connectMongoDB();

module.exports = app;

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => {
    console.log(`🌟 Review microservice running on port ${PORT}`);
  });
}