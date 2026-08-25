const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');

router.get('/reviews', feedbackController.getReviews);
router.post('/reviews', feedbackController.createReview);
router.delete('/reviews', feedbackController.deleteReviewsByProduct);

module.exports = router;