import React, { useState } from "react";
import '../styles/SeatSelection1.css'; // Adjust the path as necessary
import { useUser } from "@clerk/clerk-react";

const SeatSelection = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSelect = (seat) => {
    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
  };

  const seatButton = (label, category) => {
    const isSelected = selectedSeats.includes(label);
    return (
      <button
        key={label}
        onClick={() => handleSelect(label)}
        className={`seat ${isSelected ? 'selected' : ''}`}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="page-container">
      <h1 className="main-heading">Select Your Seat</h1>

      <div className="layout-card">
        <div className="layout-flex responsive-flex">
          {/* VIP Section - Left Vertical */}
          <div className="section-card section-vip">
            <h2 className="section-title">VIP - ₹5000</h2>
            <div className="seat-grid-vertical responsive-vertical">
              {[...Array(8)].map((_, i) => seatButton(`VIP-${i + 1}`, "VIP"))}
            </div>
          </div>

          <div className="center-layout">
            <div className="stage-box">STAGE</div>

            <div className="section-card section-firstrow">
              <h2 className="section-title">First Row - ₹1000</h2>
              <div className="seat-grid-horizontal responsive-horizontal">
                {[...Array(10)].map((_, i) => seatButton(`FR-${i + 1}`, "FR"))}
              </div>
            </div>

            <div className="section-card section-general">
              <h2 className="section-title">General - ₹600</h2>
              <div className="seat-grid-general responsive-general">
                {[...Array(18)].map((_, i) => seatButton(`G-${i + 1}`, "G"))}
              </div>
            </div>
          </div>
        </div>

        <div className="gate-text">⟵ GATE</div>
      </div>
    </div>
  );
};

export default SeatSelection;
