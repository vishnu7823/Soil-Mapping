import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import "./styles/chart.css";

export default function NutrientChart({ data }) {
  if (!data) return null;

  const { macroNutrients = {}, microNutrients = {}, pH } = data;

  const chartData = [
    { name: "Nitrogen (N)", value: macroNutrients.nitrogen || 0 },
    { name: "Phosphorus (P)", value: macroNutrients.phosphorus || 0 },
    { name: "Potassium (K)", value: macroNutrients.potassium || 0 },
    { name: "Iron (Fe)", value: microNutrients.iron || 0 },
    { name: "Zinc (Zn)", value: microNutrients.zinc || 0 },
    { name: "Copper (Cu)", value: microNutrients.copper || 0 },
    { name: "Manganese (Mn)", value: microNutrients.manganese || 0 },
  ];

  return (
    <div className="chart-container">
      <h4>🌿 Nutrient Visualization</h4>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#6b21a8" />
        </BarChart>
      </ResponsiveContainer>

      <div className="ph-card">
        <p>
          <strong>Soil pH:</strong> {pH ?? "N/A"}{" "}
          <span
            className={
              pH < 6.5 ? "ph-acidic" : pH > 7.5 ? "ph-alkaline" : "ph-normal"
            }
          >
            {pH < 6.5
              ? "(Acidic)"
              : pH > 7.5
              ? "(Alkaline)"
              : "(Neutral / Ideal)"}
          </span>
        </p>
      </div>
    </div>
  );
}
