const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");

const app = express();
const PORT = process.env.PORT || 5000;

const connectDB = async () => {
  try {
    // It's best to explicitly pass options, especially to avoid warnings
    await mongoose.connect(process.env.MONGO_URI, {
      // No need for useNewUrlParser and useUnifiedTopology in MongoDB v4+
      // These are safe modern options for compatibility
      serverSelectionTimeoutMS: 5000, // Optional: timeout after 5s if no server response
    });

    console.log("✅ MongoDB connected");

    app.listen(PORT, () =>
      console.log(`🚀 Server is running on http://localhost:${PORT}`)
    );
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
