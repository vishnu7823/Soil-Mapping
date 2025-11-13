import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./styles/chart.css";

export default function NutrientChart({ macroNutrients, microNutrients }) {
  if (!macroNutrients || !microNutrients) return null;

  const chartData = [
    { name: "Nitrogen (N)", value: macroNutrients.nitrogen, unit: "kg/ha" },
    { name: "Phosphorus (P)", value: macroNutrients.phosphorus, unit: "kg/ha" },
    { name: "Potassium (K)", value: macroNutrients.potassium, unit: "kg/ha" },
    { name: "Iron (Fe)", value: microNutrients.iron, unit: "ppm" },
    { name: "Zinc (Zn)", value: microNutrients.zinc, unit: "ppm" },
    { name: "Copper (Cu)", value: microNutrients.copper, unit: "ppm" },
    { name: "Manganese (Mn)", value: microNutrients.manganese, unit: "ppm" },
  ];

  const validData = chartData.filter(
    (item) => item.value !== undefined && item.value !== null
  );

  return (
    <div className="chart-container">
      <h4>📊 Soil Nutrient Composition</h4>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={validData}>
          {/* Violet Gradient */}
          <defs>
            <linearGradient id="violetGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#6b21a8" />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(value, name, props) => `${value} ${props.payload.unit}`} />
          <Legend />
          <Bar
            dataKey="value"
            name="Nutrient Value"
            fill="url(#violetGradient)"
            barSize={35}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
