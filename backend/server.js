import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'; // Import cookie parser to parse jwt stored in cookie.
dotenv.config(); // Load environment variables from .env file.
import connectDB from './config/db.js'; // Import the database connection function.
import { notFound, errorHandler } from './middleware/errorMiddleware.js'; // Import custom error handling middleware.
import productRoutes from './routes/productRoutes.js'; // Import product routes.
import userRoutes from './routes/userRoutes.js'; // Import user routes.
import orderRoutes from './routes/orderRoutes.js'; // Import order routes.

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
// Use the products route for handling requests to /api/products.
app.use('/api/products', productRoutes);
// Use the users route for handling requests to /api/users.
app.use('/api/users', userRoutes);
// Use the orders route for handling request to /api/orders.
app.use('/api/orders', orderRoutes);

app.get('/api/config/paypal', (req, res) => {
  res.send({ clientId: process.env.PAYPAL_CIENT_ID });
});

app.get('/', (req, res) => {
  res.send('API is running');
});

// Custom error handling.
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
