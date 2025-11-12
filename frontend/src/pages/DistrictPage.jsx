import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSoilData } from "../api/soilService";
import SoilDetails from "../components/SoilDetails";
import "./district.css";


export default function DistrictPage() {
  const { state, district } = useParams();
  const [soilData, setSoilData] = useState(null);

  useEffect(() => {
    getSoilData(state, district).then((res) => setSoilData(res.data));
  }, [state, district]);

  return (
    <div className="district-page">
      <h1>🌍 Soil Fertility Data for {district}, {state}</h1>
      {soilData ? <SoilDetails data={soilData} /> : <p>Loading...</p>}
    </div>
  );
}
