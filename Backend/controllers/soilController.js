import fs from "fs";
import Soil from "../models/soil.js";



// ✅ Initialize Database from JSON
export const initializeData = async (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync("./soil_data_full_reconstructed.json", "utf-8"));

    await Soil.deleteMany(); // Clear old data

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

    await Soil.insertMany(bulkData);
    res.json({ message: "✅ Soil data successfully initialized into MongoDB", count: bulkData.length });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error initializing data" });
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
    if (!districts.length) return res.status(404).json({ error: "No districts found" });
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
    if (!soilInfo) return res.status(404).json({ error: "District data not found" });
    res.json(soilInfo);
  } catch (error) {
    res.status(500).json({ error: "Error fetching soil data" });
  }
};
