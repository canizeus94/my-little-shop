import express from 'express';
import checkObjectId from '../middleware/checkObjectId.js';
import {
  getProducts,
  getProductById,
} from '../controllers/productController.js';

// Create a new router object
const router = express.Router();

// Route to get all products
router.route('/').get(getProducts);

// Route to get a product by ID, with middleware to check if the ID is valid
router.route('/:id').get(checkObjectId, getProductById);

export default router;
