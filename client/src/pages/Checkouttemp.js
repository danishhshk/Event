import React from 'react';
import '../CheckoutStyled.css';

function CheckoutStyled({ selectedSeats = 4, ticketType = "VIP", pricePerTicket = 5000 }) {
  const totalPrice = selectedSeats * pricePerTicket;

  return (
    <div className="checkout-container">
      <div className="checkout-box">
        <h1 className="checkout-heading">Checkout</h1>

        <div className="checkout-details">
          <p><strong>Selected Seats:</strong> {selectedSeats}</p>
          <p><strong>Ticket Type:</strong> {ticketType}</p>
          <p><strong>Total Price:</strong> ₹{totalPrice}</p>
        </div>

        <button className="pay-now-button">Pay Now</button>
      </div>

      <footer className="footer">© 2025 Qawwali Night • All Rights Reserved</footer>
    </div>
  );
}

export default CheckoutStyled;
