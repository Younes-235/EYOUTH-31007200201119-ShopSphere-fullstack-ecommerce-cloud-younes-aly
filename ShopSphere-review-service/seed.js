require('dotenv').config();
const mongoose = require('mongoose');
const Feedback = require('./models/Feedback');

async function seedReviews() {
  console.log('🌱 Seeding Review Microservice Database...');
  
  const mongoURI = process.env.MONGO_URI;
  if (!mongoURI) {
    console.error('❌ MONGO_URI is missing from environment variables.');
    process.exit(1);
  }

  await mongoose.connect(mongoURI);
  console.log('🔌 Connected to MongoDB for Reviews...');

  console.log('🧹 Clearing existing reviews...');
  await Feedback.deleteMany({});

  console.log('💬 Seeding default product reviews...');
  await Feedback.create([
    {
      productId: 1,
      userId: 1,
      username: 'Younes',
      rating: 5,
      comment: 'Amazing sound quality, highly recommend!',
    },
    {
      productId: 1,
      userId: 2,
      username: 'Sarah',
      rating: 4,
      comment: 'Great build quality and very comfortable for long hours.',
    }
  ]);

  console.log('✅ Review Microservice seeding completed successfully!');
  await mongoose.disconnect();
}

seedReviews().catch((err) => {
  console.error('❌ Error seeding reviews:', err);
  process.exit(1);
});
