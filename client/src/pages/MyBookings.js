import React, { useEffect, useState } from "react";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.email) {
      fetch(`${process.env.REACT_APP_API_URL}/api/my-bookings?email=${user.email}`)
        .then(res => res.json())
        .then(data => setBookings(data))
        .catch(() => setBookings([]));
    }
  }, []);

  return (
    <div className="container mt-4">
      <h2>My Bookings</h2>
      {bookings.length === 0 && <p>No bookings found.</p>}
      {bookings.map(booking => (
        <div key={booking._id} className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">Payment ID: {booking.paymentId}</h5>
            {booking.frontRowSeats && booking.frontRowSeats.length > 0 && (
              <p className="card-text">Front Row Seats: {booking.frontRowSeats.join(", ")}</p>
            )}
            {booking.generalCount > 0 && (
              <p className="card-text">General Tickets: {booking.generalCount}</p>
            )}
            {booking.vipTable && (
              <p className="card-text">VIP Table: {booking.vipTable}</p>
            )}
            <p className="card-text">Total Price: ₹{booking.price}</p>
            <p className="card-text">Booked At: {booking.timestamp ? new Date(booking.timestamp).toLocaleString() : "-"}</p>
            <p className="card-text">Used: {booking.used ? "Yes" : "No"}</p>
            {booking.qrCode && (
              <img src={booking.qrCode} alt="QR Code" style={{ width: 150, marginTop: 10 }} />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyBookings;