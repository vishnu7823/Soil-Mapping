import mongoose from "mongoose";

const soilSchema = new mongoose.Schema({
  state: { type: String, required: true },
  district: { type: String, required: true },
  soil: { type: String },
  crops: { type: [String] },
  yields: { type: [Number] },
  pH: { type: Number },
  microNutrients: {
    iron: Number,
    zinc: Number,
    copper: Number,
    manganese: Number,
  },
  macroNutrients: {
    nitrogen: Number,
    phosphorus: Number,
    potassium: Number,
  },
  yearlyRainfall: Number,
  rainfallPercent: Number,
 
  disasterHotspot: {
    isHotspot: { type: Boolean },
    type: { type: String },
  },
});

export default mongoose.model("Soil", soilSchema);
