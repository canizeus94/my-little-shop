import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

/*
 * Gets all the products from the dataabase.
 *******************************************************************************
 * @desc - Fetch all products from the database.
 * @route - GET /api/products
 * @access - Public
 ********************************************************************************
*/
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});

/*
 * Gets a product by its ID from the database.
 *******************************************************************************
 * @desc - Fetch a single product by ID from the database.
 * @route - GET /api/products/:id
 * @access - Public
 ********************************************************************************
*/
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

export {getProducts, getProductById };