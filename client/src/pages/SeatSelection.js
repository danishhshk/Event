// src/pages/SeatSelection.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import '../SeatSelection.css'; // optional for styling

const seats = Array.from({ length: 36 }, (_, i) => i + 1); // 36 seats

function SeatSelection() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const { user } = useUser();
  const navigate = useNavigate();

  const toggleSeat = (seat) => {
    setSelectedSeats(prev =>
      prev.includes(seat) ? prev.filter(s => s !== seat) : [...prev, seat]
    );
  };

  const handleContinue = () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat.");
      return;
    }

    if (!user) {
      // Save seat selection in local storage
      localStorage.setItem('selectedSeats', JSON.stringify(selectedSeats));
      navigate('/sign-in');
    } else {
      navigate('/checkout', { state: { selectedSeats } });
    }
  };

  return (
    <div className="container py-5 text-center">
      <h2 className="mb-4 text-danger fw-bold">Select Your Seats 🎟️</h2>
      <div className="row justify-content-center mb-4">
        <div className="seat-grid">
          {seats.map(seat => (
            <button
              key={seat}
              className={`seat ${selectedSeats.includes(seat) ? 'selected' : ''}`}
              onClick={() => toggleSeat(seat)}
            >
              {seat}
            </button>
          ))}
        </div>
      </div>
      <button className="btn btn-success btn-lg" onClick={handleContinue}>
        Continue to Checkout
      </button>
    </div>
  );
}

export default SeatSelection;
