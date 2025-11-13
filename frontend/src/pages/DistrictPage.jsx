import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSoilData } from "../api/soilService";
import SoilDetails from "../components/SoilDetails";
import ChartComponent from "../components/NutrientChart";
import MapComponent from "../components/SoilMap";
import QRCodeSection from "../components/QRGenerator";
import "./district.css";

export default function DistrictPage() {
  const { state, district } = useParams();
  const [soilData, setSoilData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getSoilData(state, district)
      .then((res) => {
        setSoilData(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching soil data:", error);
        setLoading(false);
      });
  }, [state, district]);

  if (loading) {
    return (
      <div className="district-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading soil data for {district}, {state}...</p>
        </div>
      </div>
    );
  }

  if (!soilData) {
    return (
      <div className="district-page">
        <div className="error-container">
          <h2>⚠️ Data Not Available</h2>
          <p>Sorry, we couldn't load soil data for {district}, {state}.</p>
          <p>Please try selecting another district or check back later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="district-page">
      <div className="district-header">
        <h2>🌍 Soil Fertility Analysis</h2>
        <p>{district}, {state} - Comprehensive Soil Health Report</p>
      </div>

      <div className="content-grid">
        <div className="left-column">
          <SoilDetails data={soilData} />
          <QRCodeSection state={state} district={district} />
        </div>

        <div className="right-column">
          <ChartComponent data={soilData} state={state} district={district} />
          <MapComponent data={soilData} state={state} district={district} />
        </div>
      </div>
    </div>
  );
}