import React, { useEffect, useState } from "react";
import { getStates, getDistricts, getSoilData } from "../api/soilService";
import SoilDetails from "./SoilDetails";
import QRGenerator from "./QRGenerator";
import "./styles/selector.css";
import NutrientChart from "./NutrientChart";
import SoilMap from "./SoilMap";

export default function StateDistrictSelector() {
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [soilData, setSoilData] = useState(null);

  useEffect(() => {
    getStates().then((res) => setStates(res.data));
  }, []);

  const handleStateChange = async (e) => {
    const state = e.target.value;
    setSelectedState(state);
    setSelectedDistrict("");
    setSoilData(null);
    if (state) {
      const res = await getDistricts(state);
      setDistricts(res.data);
    }
  };

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
  };

  const handleShowData = async () => {
    if (selectedState && selectedDistrict) {
      const res = await getSoilData(selectedState, selectedDistrict);
      setSoilData(res.data);
    }
  };

  return (
    <div className="selector-container">
      <h2 className="heading">🌾 Soil Fertility Mapping</h2>
      <p className="sub-heading">
        Select a State and District to view soil fertility details.
      </p>

      <div className="dropdown-section">
        <select value={selectedState} onChange={handleStateChange}>
          <option value="">Select State</option>
          {states.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <select
          value={selectedDistrict}
          onChange={handleDistrictChange}
          disabled={!selectedState}
        >
          <option value="">Select District</option>
          {districts.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        <button className="btn-show" onClick={handleShowData}>
          Show Soil Data
        </button>
      </div>

      {soilData && (
        <div className="result-section">
          <SoilDetails data={soilData} />
          <QRGenerator state={selectedState} district={selectedDistrict} />
          <NutrientChart data={soilData} />
    <SoilMap state={selectedState} district={selectedDistrict} />
        </div>
      )}
    </div>
  );
}
