const axios = require('axios');

// Points to your independently deployed review service URL
const REVIEW_SERVICE_URL = process.env.REVIEW_SERVICE_URL || 'http://localhost:5001';

// POST /api/products/:id/reviews
exports.addFeedback = async (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        const { rating, comment } = req.body;
        
        const userId = req.user.id; 
        const username = req.user.name || "Anonymous"; 

        // Forward via REST to the independent review service
        const response = await axios.post(`${REVIEW_SERVICE_URL}/api/reviews`, {
            productId,
            userId,
            username,
            rating: Number(rating),
            comment
        });

        res.status(201).json({ message: 'Feedback submitted successfully!', feedback: response.data });
    } catch (error) {
        console.error('Error forwarding review to microservice:', error.message);
        res.status(500).json({ error: 'Failed to save feedback' });
    }
};

// GET /api/products/:id/reviews
exports.getProductFeedback = async (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        
        // Fetch via REST from the independent review service
        const response = await axios.get(`${REVIEW_SERVICE_URL}/api/reviews?productId=${productId}`);
        
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error fetching reviews from microservice:', error.message);
        res.status(500).json({ error: 'Failed to fetch reviews' });
    }
};