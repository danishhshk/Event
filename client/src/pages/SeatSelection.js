// src/pages/SeatSelection.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
// import "../SeatSelection.css";
import "../styles/SeatSelection1.css"; // Adjust the path as necessary

const SeatSelection = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("selectedSeats");
    if (saved) {
      setSelectedSeats(JSON.parse(saved));
    }
  }, []);

  const handleSelect = (seat) => {
    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
  };

  const handleContinue = () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat.");
      return;
    }

    localStorage.setItem("selectedSeats", JSON.stringify(selectedSeats));

    if (!user) {
      // Pass intended path as query param
      navigate(`/sign-in?redirectTo=/checkout`);
    } else {
      navigate("/checkout", { state: { selectedSeats } });
    }
  };

  const seatButton = (label, category) => {
    const isSelected = selectedSeats.includes(label);
    return (
      <button
        key={label}
        onClick={() => handleSelect(label)}
        className={`seat ${isSelected ? "selected" : ""}`}
      >
        {label}
      </button>
    );
  };

  const validSeat = (seat) =>
    typeof seat === "string" &&
    (seat.startsWith("VIP-") ||
     seat.startsWith("1-") ||
     seat.startsWith("2-") ||
     seat.startsWith("R-"));

  const filteredSeats = selectedSeats.filter(validSeat);

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
              <h2 className="section-title">Front Row - ₹799</h2>
              <div className="seat-grid-horizontal responsive-horizontal">
                {[...Array(8)].map((_, i) => seatButton(`1-${i + 1}`, "frontRow"))}
              </div>
            </div>

            <div className="section-card section-otherrows">
              <h2 className="section-title">General - ₹599</h2>
              <div className="seat-grid-horizontal responsive-horizontal">
                {[...Array(20)].map((_, i) => seatButton(`2-${i + 1}`, "general"))}
              </div>
            </div>
          </div>

          {/* Regular Section - Right Vertical */}
          <div className="section-card section-regular">
            <h2 className="section-title">Regular - ₹2500</h2>
            <div className="seat-grid-vertical responsive-vertical">
              {[...Array(8)].map((_, i) => seatButton(`R-${i + 1}`, "Regular"))}
            </div>
          </div>
        </div>

        <button className="btn btn-success btn-lg" onClick={handleContinue}>
          Continue to Checkout
        </button>
      </div>
    </div>
  );
};

export default SeatSelection;
