import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

// Load environment variables from .env file.
dotenv.config();

// Connect to the database.
connectDB();


// Import sample data into the database.
const importData = async () => {
  try {
    // Clear existing data.
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // Create new users and admin user.
    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    // Create new products with the admin user as the creator.
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    // Insert sample products into the database.
    await Product.insertMany(sampleProducts);

    console.log(colors.green.inverse("Data Imported!"));
    process.exit();
  } catch (error) {
    console.error(colors.red.inverse(`Error: ${error.message}`));
    process.exit(1);
  }
};

// Destroy all data in the database.
const destroyData = async () => {
  try {
    // Clear all data from the database.
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log(colors.red.inverse("Data Destroyed!"));
    process.exit();
  } catch (error) {
    console.error(colors.red.inverse(`Error: ${error.message}`));
    process.exit(1);
  }
};

// Check command line arguments to determine whether to import or destroy data.
if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}