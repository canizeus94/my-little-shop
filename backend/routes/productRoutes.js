import express from "express";
import checkObjectId from "../middleware/checkObjectId.js";
import { getProducts, getProductById } from "../controllers/productController.js";

const router = express.Router();

// Route to get all products.
router.route('/').get(getProducts);

// Route to get a product by ID.
router.route('/:id').get(checkObjectId, getProductById);


export default router;