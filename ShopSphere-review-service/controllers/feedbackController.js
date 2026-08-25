const Feedback = require('../models/Feedback.js');

// GET /api/reviews?productId=X
exports.getReviews = async (req, res) => {
    try {
        const { productId } = req.query;

        if (!productId) {
            return res.status(400).json({ error: "productId query parameter is required" });
        }

        const reviews = await Feedback.find({ productId: parseInt(productId) }).sort({ createdAt: -1 });
        res.status(200).json(reviews);
    } catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(500).json({ error: "Failed to fetch reviews" });
    }
};

// POST /api/reviews
exports.createReview = async (req, res) => {
    try {
        const { productId, userId, username, rating, comment } = req.body;

        if (!productId || !userId || !username || !rating || !comment) {
            return res.status(400).json({ error: "Missing required review fields" });
        }

        const newFeedback = await Feedback.create({
            productId,
            userId,
            username,
            rating,
            comment
        });

        res.status(201).json(newFeedback);
    } catch (error) {
        console.error("Error creating review:", error);
        res.status(400).json({ error: "Failed to create review" });
    }
};

// DELETE /api/reviews?productId=X
exports.deleteReviewsByProduct = async (req, res) => {
    try {
        const { productId } = req.query;

        if (!productId) {
            return res.status(400).json({ error: "productId query parameter is required" });
        }

        const result = await Feedback.deleteMany({ productId: parseInt(productId) });
        res.status(200).json({ message: "Reviews deleted", deletedCount: result.deletedCount });
    } catch (error) {
        console.error("Error deleting reviews:", error);
        res.status(500).json({ error: "Failed to delete reviews" });
    }
};