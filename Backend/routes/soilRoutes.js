import express from "express";
import { initializeData, getStates, getDistricts, getSoilData } from "../controllers/soilController.js";

const router = express.Router();

// Initialize DB with JSON file
router.post("/init", initializeData);

// Get all states
router.get("/states", getStates);

// Get districts for a specific state
router.get("/districts/:state", getDistricts);

// Get soil data for specific district
router.get("/:state/:district", getSoilData);

export default router;
