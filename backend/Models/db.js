import mongoose from "mongoose";

let isConnected = false; // track connection

export const connectDB = async () => {
  if (isConnected) return;
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("✅ MongoDB Connected...");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err.message);
  }
};



