import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'; // Import cookie parser to parse jwt stored in cookie.
dotenv.config(); // Load environment variables from .env file.
import connectDB from './config/db.js'; // Import the database connection function.
import { notFound, errorHandler } from './middleware/errorMiddleware.js'; // Import custom error handling middleware.
import productRoutes from './routes/productRoutes.js'; // Import product routes.
import userRoutes from './routes/userRoutes.js'; // Import user routes.

// Port number for the server.
const port = process.env.PORT || 5000;

// Connect to the database.
connectDB();

// Create an instance of the Express application.
const app = express();

// Body parser middleware.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware.
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('API is running');
});

// Use the product routes for handling requests to /api/products.
app.use('/api/products', productRoutes);

// Use the user routes for handling requests to /api/users.
app.use('/api/users', userRoutes);

// Custom error handling.
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
