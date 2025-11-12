import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StateDistrictSelector from "./components/StateDistrictSelector";
import DistrictPage from "./pages/DistrictPage";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <header>
          <h1>🌱 Smart Soil Fertility Mapper</h1>
          <p>Discover soil health and crop potential across Indian districts</p>
        </header>

        <Routes>
          <Route path="/" element={<StateDistrictSelector />} />
          <Route path="/district/:state/:district" element={<DistrictPage />} />
        </Routes>

        <footer>
          <p>© 2025 Soil Mapping | Designed by Yoga Vaibhav & Developed by Kimaya shree</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
