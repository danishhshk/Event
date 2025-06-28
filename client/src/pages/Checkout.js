import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from "@clerk/clerk-react";
import '../styles/CheckoutStyled.css'; // Adjust the path as necessary

// Add or update this mapping at the top of your file
const seatPrices = {
  VIP: 5000,
  frontRow: 799,
  general: 599,
};

// Example getSeatType function
function getSeatType(seat) {
  if (typeof seat !== "string") return "";
  if (seat.startsWith("VIP-")) return "VIP";
  if (seat.startsWith("1-")) return "frontRow";
  if (seat.startsWith("2-")) return "general";
  if (seat.startsWith("R-")) return "general";
  return "";
}

function CheckoutStyled() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isLoaded } = useUser();

  // Get selected seats from navigation state or default to empty array
  const selectedSeats = location.state?.selectedSeats || [];

  // Define validSeat and filteredSeats FIRST
  const validSeat = seat =>
    typeof seat === "string" &&
    (seat.startsWith("VIP-") ||
     seat.startsWith("1-") ||
     seat.startsWith("2-") ||
     seat.startsWith("R-"));

  const filteredSeats = selectedSeats.filter(validSeat);

  // Now you can safely use filteredSeats
  const totalPrice = filteredSeats.reduce((sum, seat) => {
    const type = getSeatType(seat);
    return sum + (seatPrices[type] || seatPrices.general);
  }, 0);

  const seatTypeSummary = filteredSeats
    .map(seat => `${seat} (${getSeatType(seat)})`)
    .join(', ');

  // Redirect if no seats are selected
  useEffect(() => {
    if (!selectedSeats.length) {
      navigate('/seats');
    }
  }, [selectedSeats, navigate]);

  const handlePayment = () => {
    const options = {
      key: 'rzp_test_CeKIqjPg3bRr1K', // Replace with your Razorpay Test Key
      amount: totalPrice * 100, // Amount in paise
      currency: 'INR',
      name: 'ZESTHAUS Events',
      description: 'Ticket Booking for Qawwali Night',
      image: '', // Optional logo
      handler: function (response) {
        // Save booking to backend after successful payment
        fetch('http://localhost:5000/api/bookings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            seats: selectedSeats,
            price: totalPrice,
            paymentId: response.razorpay_payment_id,
            user: {
              name: user?.fullName || '',
              email: user?.emailAddresses?.[0]?.emailAddress || '',
            }
          })
        })
        .then(res => res.json())
        .then(data => {
          localStorage.removeItem("selectedSeats"); // <-- Add this line
          navigate('/confirmation', {
            state: {
              selectedSeats,
              totalPrice,
              paymentId: response.razorpay_payment_id,
            },
          });
        })
        .catch(err => {
          alert('Booking failed to save!');
        });
      },
      prefill: {
        name: user?.fullName || '',
        email: user?.emailAddresses?.[0]?.emailAddress || '',
        contact: '9999999999',
      },
      notes: {
        address: 'Mumbai - Event Location',
      },
      theme: {
        color: '#F37254',
      },
    };

    const rzp = new window.Razorpay(options);

    rzp.on('payment.failed', function (response) {
      alert('Payment failed: ' + response.error.description);
    });

    rzp.open();
  };

  return (
    <div className="checkout-container">
      <div className="checkout-box">
        <h1 className="checkout-heading">Checkout</h1>
        <div className="checkout-details">
          <p><strong>Selected Seats:</strong> {filteredSeats.join(', ') || 'None'}</p>
          <p><strong>Seat Types:</strong> {seatTypeSummary || 'None'}</p>
          <p><strong>Total Price:</strong> ₹{totalPrice}</p>
        </div>
        <button className="pay-now-button" onClick={handlePayment}>Pay Now</button>
      </div>
      <footer className="footer">© 2025 Qawwali Night • All Rights Reserved</footer>
    </div>
  );
}

export default CheckoutStyled;
