const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Feedback = require('./models/Feedback');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB database
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Review Service connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// GET: Fetch reviews for a specific product
app.get('/api/reviews', async (req, res) => {
  try {
    const { productId } = req.query;
    const filter = productId ? { productId: Number(productId) } : {};
    const reviews = await Feedback.find(filter).sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// POST: Create a new review
app.post('/api/reviews', async (req, res) => {
  try {
    const { productId, userId, username, rating, comment } = req.body;
    
    const newFeedback = await Feedback.create({
      productId: Number(productId),
      userId,
      username,
      rating: Number(rating),
      comment
    });

    res.status(201).json(newFeedback);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save feedback' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Independent Review Service running on port ${PORT}`);
});