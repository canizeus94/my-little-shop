import asyncHandler from "../middleware/asyncHandler";
import Product from "../models/productModel.js";

const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    // Return the product if found, otherwise return a 404 error if it's not found.
    if (product) {
      return res.json(product);
    } else {
        res.status(404);
        throw new Error(`Product with ID: ${req.params.id} not found.`);
    }
});