import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
console.log(process.env.MONGODB_URI)
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("DB connection error:", error.message);
  }
};

export default connectDB;