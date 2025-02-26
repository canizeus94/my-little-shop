import express from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";
import checkObjectId from "../middleware/checkObjectId.js";

const router = express.Router();

// Route to get all products.
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
  })
);

// Route to get a product by ID.
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    // Return the product if found, otherwise return a 404 error.
    if (product) {
      return res.json(product);
    }

    res.status(404);
    throw new Error(`Product with ID: ${req.params.id} not found.`);
  })
);

export default router;