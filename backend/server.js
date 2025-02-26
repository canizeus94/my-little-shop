import express from "express";
import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file.
import connectDB from "./config/db.js"; // Import the database connection function.
import { notFound, errorHandler } from "./middleware/errorMiddleware.js"; // Import custom error handling middleware.
import productRoutes from "./routes/productRoutes.js"; // Import product routes.

// Port number for the server.
const port = process.env.PORT || 5000;

// Connect to the database.
connectDB();

// Create an instance of the Express application
const app = express();

app.get('/', (req, res) => {
  res.send("API is running");
});

// Use the product routes for handling requests to /api/products.
app.use('/api/products', productRoutes);

// Custom error handling.
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});