import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";

const MyBookings = () => {
  const { user, isLoaded } = useUser();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (isLoaded && user) {
      fetch(`http://localhost:5000/api/my-bookings?email=${user.emailAddresses[0].emailAddress}`)
        .then(res => res.json())
        .then(data => setBookings(data));
    }
  }, [isLoaded, user]);

  return (
    <div className="container mt-4">
      <h2>My Bookings</h2>
      {bookings.length === 0 && <p>No bookings found.</p>}
      {bookings.map(booking => (
        <div key={booking._id} className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">Payment ID: {booking.paymentId}</h5>
            <p className="card-text">Seats: {booking.seats.join(", ")}</p>
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