const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const mongoose = require('mongoose');
const ActivityLog = require('../models/ActivityLog');

async function clearActivityLogs() {
  const mongoURI = process.env.MONGO_URI;
  if (!mongoURI) {
    console.error('❌ MONGO_URI is missing in backend/.env');
    process.exit(1);
  }

  console.log('🔌 Connecting to MongoDB Atlas...');
  await mongoose.connect(mongoURI);

  console.log('🧹 Clearing all activity logs...');
  const result = await ActivityLog.deleteMany({});
  console.log(`✅ Successfully cleared ${result.deletedCount} old activity log records.`);

  await mongoose.disconnect();
}

clearActivityLogs().catch(err => {
  console.error('❌ Error clearing logs:', err.message);
  process.exit(1);
});
