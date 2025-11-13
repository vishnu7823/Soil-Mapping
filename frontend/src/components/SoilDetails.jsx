import React from "react";
import "./styles/soilDetails.css";
import NutrientChart from "./NutrientChart";

export default function SoilDetails({ data }) {
  if (!data) return null;

  const {
    soil,
    pH,
    crops = [],
    microNutrients = {},
    macroNutrients = {},
    yearlyRainfall,
    disasterHotspot = {},
  } = data;

  return (
    <div className="soil-card">
      <h3 className="soil-title">
        {data.district}, <span>{data.state}</span>
      </h3>

      {/* 🔹 General Info Section */}
      <div className="info-grid">
        <div className="info-item">
          <label>Soil Type</label>
          <p>{soil || "N/A"}</p>
        </div>
        <div className="info-item">
          <label>pH Level</label>
          <p>{pH || "N/A"}</p>
        </div>
        <div className="info-item">
          <label>Yearly Rainfall</label>
          <p>{yearlyRainfall ? `${yearlyRainfall} mm` : "N/A"}</p>
        </div>
        <div className="info-item">
          <label>Disaster Hotspot</label>
          <p>
            {disasterHotspot?.isHotspot
              ? disasterHotspot?.type || "Yes"
              : "None"}
          </p>
        </div>
      </div>

      {/* 🔹 Crops */}
      <div className="crop-section">
        <h4>🌾 Major Crops</h4>
        <div className="crop-list">
          {crops.length ? (
            crops.map((crop, i) => <span key={i}>{crop}</span>)
          ) : (
            <p>N/A</p>
          )}
        </div>
      </div>

      {/* 🔹 Nutrient Summary */}
      <div className="nutrient-section">
        <h4>🧪 Nutrient Composition Overview</h4>

        <div className="nutrient-grid">
          <div>
            <h5>Macro Nutrients (kg/ha)</h5>
            <ul>
              <li>Nitrogen (N): {macroNutrients.nitrogen ?? "N/A"}</li>
              <li>Phosphorus (P): {macroNutrients.phosphorus ?? "N/A"}</li>
              <li>Potassium (K): {macroNutrients.potassium ?? "N/A"}</li>
            </ul>
          </div>

          <div>
            <h5>Micro Nutrients (ppm)</h5>
            <ul>
              <li>Iron (Fe): {microNutrients.iron ?? "N/A"}</li>
              <li>Zinc (Zn): {microNutrients.zinc ?? "N/A"}</li>
              <li>Copper (Cu): {microNutrients.copper ?? "N/A"}</li>
              <li>Manganese (Mn): {microNutrients.manganese ?? "N/A"}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 🔹 Nutrient Chart Visualization */}
      <NutrientChart
        macroNutrients={macroNutrients}
        microNutrients={microNutrients}
      />
    </div>
  );
}
