import mongoose from "mongoose";

// Connect to MongoDB Database.
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1); // Exit the process with failure
  }
};
// Export the connection function.
export default connectDB;