import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";
import axios from "axios";
import "./styles/map.css";


const soilIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/1673/1673221.png",
  iconSize: [32, 32],
});

export default function SoilMap({ district, state }) {
  const [coords, setCoords] = useState([20.5937, 78.9629]); // default India

  useEffect(() => {
    async function fetchCoordinates() {
      try {
        const location = `${district}, ${state}, India`;
        const res = await axios.get("https://nominatim.openstreetmap.org/search", {
          params: {
            q: location,
            format: "json",
            addressdetails: 1,
            limit: 1,
          },
        });

        if (res.data && res.data.length > 0) {
          const { lat, lon } = res.data[0];
          setCoords([parseFloat(lat), parseFloat(lon)]);
        } else {
          console.warn("No coordinates found for", location);
        }
      } catch (err) {
        console.error("Error fetching coordinates:", err);
      }
    }

    fetchCoordinates();
  }, [district, state]);

  // 🎨 Define circle color based on soil pH, fertility, or static theme
  const circleOptions = {
    color: "#6b21a8",          // border color (violet)
    fillColor: "#22c55e",      // fill color (green)
    fillOpacity: 0.4,
    radius: 20000,             // meters (20 km radius)
  };

  return (
    <div className="map-container">
      <h4>🗺️ Map View</h4>
      <MapContainer center={coords} zoom={8} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={coords} icon={soilIcon}>
          <Popup>
            <b>{district}</b> <br /> {state}
          </Popup>
        </Marker>

        {/* 🌈 Add colored circle highlight */}
        <Circle center={coords} pathOptions={circleOptions} />
      </MapContainer>
    </div>
  );
}
