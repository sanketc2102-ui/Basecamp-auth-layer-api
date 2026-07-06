import "dotenv/config";
import mongoose from "mongoose";

async function connectDB() {
  try {
    const connection = await mongoose.connect(process.env.DATA_BASE_URL);
    console.log("✅ mongodb connection established");
  } catch (err) {
    console.error("❌ db connection failed", err);
    process.exit(1);
  }
}

export default connectDB;
