import express from 'express';
import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file
import products from './data/products.js';

// Port number for the server
const port = process.env.PORT || 5000;
// Create an instance of the Express application
const app = express();

app.get('/', (req, res) => {
  res.send('API is running');
});

// Endpoint to get all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Endpoint to get a product by ID
app.get('/api/products/:id', (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found!' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});