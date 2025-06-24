import React, { useState } from 'react';

const SeatSelectionPage = () => {
  const seats = Array.from({ length: 30 }, (_, i) => i + 1);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const toggleSeat = (seat) => {
    setSelectedSeats(prev =>
      prev.includes(seat) ? prev.filter(s => s !== seat) : [...prev, seat]
    );
  };

  const handleBooking = () => {
    alert(`Booked: ${selectedSeats.join(', ')}`);
  };

  return (
    <div className="container mt-4">
      <h2>Select Your Seats</h2>
      <div className="d-flex flex-wrap gap-2 my-4">
        {seats.map((seat) => (
          <button
            key={seat}
            className={`btn btn-sm ${selectedSeats.includes(seat) ? 'btn-success' : 'btn-outline-secondary'}`}
            onClick={() => toggleSeat(seat)}
          >
            Seat {seat}
          </button>
        ))}
      </div>
      <button className="btn btn-primary" onClick={handleBooking} disabled={selectedSeats.length === 0}>
        Book Now
      </button>
    </div>
  );
};

export default SeatSelectionPage;
