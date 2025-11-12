import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import soilRoutes from "./routes/soilRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
app.use("/api/soil", soilRoutes);

// Base route
app.get("/", (req, res) => {
  res.send("🌱 Soil Fertility API with MongoDB is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
