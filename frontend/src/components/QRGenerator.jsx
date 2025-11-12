import React from "react";
import { QRCodeCanvas } from "qrcode.react";
import "./styles/qr.css";


export default function QRGenerator({ state, district }) {
 // 🟢 Use deployed site link (fallback to localhost for local dev)
const frontendURL = process.env.REACT_APP_FRONTEND_URL || "http://localhost:3000";
const url = `${frontendURL}/district/${encodeURIComponent(state)}/${encodeURIComponent(district)}`;

  return (
    <div className="qr-section">
      <h3>📱 QR Code for {district}</h3>
      <QRCodeCanvas value={url} size={180} bgColor="#ffffff" fgColor="#3b0764" />
      <p className="qr-link">
        Scan or visit: <a href={url}>{url}</a>
      </p>
    </div>
  );
}
