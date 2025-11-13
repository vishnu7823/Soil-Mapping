import fs from "fs";
import path from "path";
import Soil from "../models/soil.js";

// ✅ Initialize Database from Previous JSON (Revert Version)
export const initializeData = async (req, res) => {
  try {
    // Absolute path for reliability on Render
   const filePath = path.join(path.resolve(), "soil_data_full_reconstructed.json");

    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    // Step 1: Clear existing records
    const deleted = await Soil.deleteMany({});
    console.log(`🗑️ Deleted ${deleted.deletedCount} old records.`);

    // Step 2: Prepare data from { state: { district: details } } structure
    const bulkData = [];
    for (const [state, districts] of Object.entries(data)) {
      for (const [district, details] of Object.entries(districts)) {
        bulkData.push({
          state,
          district,
          ...details,
        });
      }
    }

    // Step 3: Insert new data (old JSON dataset)
    await Soil.insertMany(bulkData);
    console.log(`✅ Inserted ${bulkData.length} records from previous dataset.`);

    res.status(200).json({
      message: "✅ MongoDB restored with previous soil data.",
      deletedCount: deleted.deletedCount,
      insertedCount: bulkData.length,
    });
  } catch (error) {
    console.error("❌ Error restoring previous data:", error);
    res.status(500).json({ error: "Error restoring data", details: error.message });
  }
};

// 🏛️ Get All States
export const getStates = async (req, res) => {
  try {
    const states = await Soil.distinct("state");
    res.json(states);
  } catch (error) {
    res.status(500).json({ error: "Error fetching states" });
  }
};

// 📍 Get Districts by State
export const getDistricts = async (req, res) => {
  try {
    const { state } = req.params;
    const districts = await Soil.find({ state }).distinct("district");
    if (!districts.length)
      return res.status(404).json({ error: "No districts found for this state" });
    res.json(districts);
  } catch (error) {
    res.status(500).json({ error: "Error fetching districts" });
  }
};

// 🌾 Get Soil Data for Specific District
export const getSoilData = async (req, res) => {
  try {
    const { state, district } = req.params;
    const soilInfo = await Soil.findOne({ state, district });
    if (!soilInfo)
      return res.status(404).json({ error: "District data not found" });
    res.json(soilInfo);
  } catch (error) {
    res.status(500).json({ error: "Error fetching soil data" });
  }
};
