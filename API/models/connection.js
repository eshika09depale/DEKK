import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const dbUrl = process.env.MONGO_URL || "mongodb://localhost:27017/Skill-Quick";

// Connect to MongoDB without deprecated options
mongoose.connect(dbUrl)
  .then(() => {
    console.log("✅ Database connected successfully");
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err.message);
    process.exit(1); // Exit process with failure
  });
