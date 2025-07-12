import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SeatSelection1.css";

const FRONT_ROW_LABELS = [
  ...Array.from({ length: 25 }, (_, i) => `A${i + 1}`),
  ...Array.from({ length: 25 }, (_, i) => `B${i + 1}`),
  ...Array.from({ length: 25 }, (_, i) => `C${i + 1}`),
];
const TOTAL_FRONTROW = 75;
const TOTAL_GENERAL = 325;

const SeatSelection = () => {
  const [frontRowCount, setFrontRowCount] = useState(0);
  const [frontRowSeats, setFrontRowSeats] = useState([]);
  const [generalCount, setGeneralCount] = useState(0);
  const [combo, setCombo] = useState(null);
  const navigate = useNavigate();

  // Simulate already booked front row seats (should come from backend)
  const [bookedFrontRowSeats, setBookedFrontRowSeats] = useState([]);

  useEffect(() => {
    // Load from localStorage if needed
    const saved = localStorage.getItem("seatSelection");
    if (saved) {
      const { frontRowCount, generalCount, frontRowSeats } = JSON.parse(saved);
      setFrontRowCount(frontRowCount || 0);
      setGeneralCount(generalCount || 0);
      setFrontRowSeats(frontRowSeats || []);
    }
    // Simulate fetch booked seats from backend
    // setBookedFrontRowSeats([...]); // e.g., ["A1", "A2"]
  }, []);

  // Assign next available front row seats when count changes
  useEffect(() => {
    const available = FRONT_ROW_LABELS.filter(
      seat => !bookedFrontRowSeats.includes(seat)
    );
    setFrontRowSeats(available.slice(0, frontRowCount));
  }, [frontRowCount, bookedFrontRowSeats]);

  // Combo logic: override counts if combo is selected
  useEffect(() => {
    if (combo === "frontrow2") {
      setFrontRowCount(2);
      setGeneralCount(0);
    } else if (combo === "general4") {
      setFrontRowCount(0);
      setGeneralCount(4);
    }
    // If no combo, do not change counts
  }, [combo]);

  const handleVIPClick = () => {
    alert(
      "VIP tables can only be booked offline. Please contact us on Instagram. Each VIP table seats 8 people and must be booked as a whole table."
    );
  };

  const handleContinue = () => {
    if (frontRowCount === 0 && generalCount === 0) {
      alert("Please select at least one ticket for Front Row or General.");
      return;
    }
    if (frontRowCount > (TOTAL_FRONTROW - bookedFrontRowSeats.length)) {
      alert("Not enough Front Row seats available.");
      return;
    }
    if (generalCount > TOTAL_GENERAL) {
      alert("Not enough General tickets available.");
      return;
    }
    const selection = {
      frontRowCount,
      generalCount,
      frontRowSeats,
      combo,
    };
    localStorage.setItem("seatSelection", JSON.stringify(selection));
    // Use localStorage to check if user is logged in
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user) {
      navigate(`/sign-in?redirectTo=/checkout`);
    } else {
      navigate("/checkout", { state: selection });
    }
  };

  return (
    <div className="layout-container">
      <h1 className="main-heading">Select Your Section</h1>

      <div className="venue-layout">
        <div className="stage">STAGE</div>

        <div className="layout-row">
          <div className="vip-block">
            <div className="label">
              VIP <span>₹9999 Per Table</span>
            </div>
            <div className="seat-row">
              {[...Array(4)].map((_, i) => (
                <button
                  key={`VIP-${i + 1}`}
                  className="seat vip-seat"
                  onClick={handleVIPClick}
                  type="button"
                  style={{ cursor: "pointer" }}
                >
                  VIP-{i + 1}
                </button>
              ))}
            </div>
            <div className="vip-note" style={{ marginTop: 8, color: "#d35400", fontSize: "0.95rem" }}>
              Each VIP table seats 8 people. Whole table booking only.<br />
              <b>
                Contact us on Instagram to book VIP:<br />
                <a href="https://www.instagram.com/zesthaus_events" target="_blank" rel="noopener noreferrer" style={{ color: "#d35400", textDecoration: "underline" }}>
                  @zesthaus_events
                </a>
              </b>
            </div>
          </div>
          <div className="frontrow-block">
            <div className="label">
              Front Row&nbsp;
              <span>
                <span style={{ textDecoration: "line-through", color: "#b71c1c", fontWeight: 400, marginRight: 6 }}>
                  ₹999
                </span>
                <span style={{ color: "#388e3c", fontWeight: 600 }}>₹799</span>
              </span>
            </div>
            <div style={{ marginTop: "1rem" }}>
              <label>
                No. of Tickets:&nbsp;
                <input
                  type="number"
                  min={0}
                  max={TOTAL_FRONTROW - bookedFrontRowSeats.length}
                  value={frontRowCount}
                  onChange={e =>
                    setFrontRowCount(
                      Math.max(0, Math.min(TOTAL_FRONTROW - bookedFrontRowSeats.length, Number(e.target.value)))
                    )
                  }
                  style={{ width: 60 }}
                  disabled={combo === "frontrow2" || combo === "general4"}
                />
              </label>
              {frontRowSeats.length > 0 && (
                <div style={{ marginTop: 8, fontSize: "0.95rem" }}>
                  Your seats: {frontRowSeats.join(", ")}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="general-block">
          <div className="label">
            General&nbsp;
            <span>
              <span style={{ textDecoration: "line-through", color: "#b71c1c", fontWeight: 400, marginRight: 6 }}>
                ₹799
              </span>
              <span style={{ color: "#388e3c", fontWeight: 600 }}>₹599</span>
            </span>
          </div>
          <div style={{ marginTop: "1rem" }}>
            <label>
              No. of Tickets:&nbsp;
              <input
                type="number"
                min={0}
                max={TOTAL_GENERAL}
                value={generalCount}
                onChange={e =>
                  setGeneralCount(Math.max(0, Math.min(TOTAL_GENERAL, Number(e.target.value)))
                )}
                style={{ width: 60 }}
                disabled={combo === "frontrow2" || combo === "general4"}
              />
            </label>
            <div style={{ marginTop: 8, fontSize: "0.95rem" }}>
              General is first come, first serve. Max occupancy: 400.
            </div>
          </div>
        </div>
      </div>

      <div className="combo-offers" style={{ margin: "32px 0 16px 0", padding: "16px", background: "#fffbe6", borderRadius: "1rem", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
        <div style={{ fontWeight: 600, fontSize: "1.1rem", marginBottom: 8 }}>Combo Offers</div>
        <label style={{ display: "block", marginBottom: 6 }}>
          <input
            type="radio"
            name="combo"
            checked={combo === "frontrow2"}
            onChange={() => setCombo("frontrow2")}
          />
          <span style={{ marginLeft: 8 }}>2 Front Row Tickets for <b>₹1500</b></span>
        </label>
        <label style={{ display: "block", marginBottom: 6 }}>
          <input
            type="radio"
            name="combo"
            checked={combo === "general4"}
            onChange={() => setCombo("general4")}
          />
          <span style={{ marginLeft: 8 }}>4 General Tickets for <b>₹2199</b></span>
        </label>
        <label style={{ display: "block" }}>
          <input
            type="radio"
            name="combo"
            checked={combo === null}
            onChange={() => setCombo(null)}
          />
          <span style={{ marginLeft: 8 }}>No Combo</span>
        </label>
      </div>

      <button className="btn btn-success btn-lg" onClick={handleContinue}>
        Continue to Checkout
      </button>
    </div>
  );
};

export default SeatSelection;