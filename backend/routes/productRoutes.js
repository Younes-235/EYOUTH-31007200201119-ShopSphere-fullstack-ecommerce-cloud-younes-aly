const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const feedbackController = require('../controllers/feedbackController');
const { protect, restrictTo } = require('../middleware/authMiddleware');
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// GET api/products
router.get("/products", productController.getAllProducts);
router.get("/products/categories", productController.getCategories);
// GET api/products/:id
router.get("/products/:id", productController.getProductById);

// POST api/products
router.post("/products", protect, restrictTo('admin'), upload.single('image'), productController.createProduct);
router.get("/products/:id/reviews", feedbackController.getProductFeedback);

router.post("/products/:id/reviews", protect, feedbackController.addFeedback);

router.patch("/products/:id", protect, restrictTo('admin'), productController.updateProductStock);

router.delete("/products/:id", protect, restrictTo('admin'), productController.deleteProduct);

module.exports = router;