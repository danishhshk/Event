import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/CheckoutStyled.css';

const seatPrices = {
  frontRow: 799,
  general: 599,
};

function CheckoutStyled() {
  const navigate = useNavigate();
  const location = useLocation();

  // Get seat selection from navigation state or localStorage
  const selection = location.state || JSON.parse(localStorage.getItem("seatSelection") || "{}");
  const frontRowSeats = selection.frontRowSeats || [];
  const frontRowCount = selection.frontRowCount || 0;
  const generalCount = selection.generalCount || 0;

  // Add to your component state
  const [combo, setCombo] = React.useState(selection.combo || null);

  useEffect(() => {
    if (!frontRowCount && !generalCount) {
      alert("Please select at least one ticket to proceed to checkout.");
      navigate('/seats');
    }
  }, [frontRowCount, generalCount, navigate]);

  // Combo price logic
  let comboPrice = null;
  let displayFrontRowCount = frontRowCount;
  let displayGeneralCount = generalCount;
  let displayFrontRowSeats = frontRowSeats;

  if (combo === "frontrow2") {
    comboPrice = 1500;
    displayFrontRowCount = 2;
    displayGeneralCount = 0;
    // If user hasn't selected seats, just send empty or auto-select logic if needed
    displayFrontRowSeats = frontRowSeats.length >= 2 ? frontRowSeats.slice(0, 2) : [];
  }
  if (combo === "general4") {
    comboPrice = 2199;
    displayFrontRowCount = 0;
    displayGeneralCount = 4;
    displayFrontRowSeats = [];
  }

  const totalPrice = comboPrice !== null
    ? comboPrice
    : (frontRowCount * seatPrices.frontRow) + (generalCount * seatPrices.general);

  // Summary for display
  const seatSummary = [
    displayFrontRowSeats.length > 0 ? `Front Row: ${displayFrontRowSeats.join(', ')}` : null,
    displayGeneralCount > 0 ? `General: ${displayGeneralCount} ticket(s)` : null,
  ].filter(Boolean).join(' | ');

  const handlePayment = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const options = {
      key: 'rzp_live_YZt9gSDVhJZjNH',
      amount: totalPrice * 100,
      currency: 'INR',
      name: 'ZESTHAUS Events',
      description: 'Ticket Booking for Qawwali Night',
      image: 'logo',
      handler: function (response) {
        fetch('https://zesthaus-production.up.railway.app/api/bookings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            frontRowSeats: displayFrontRowSeats,
            frontRowCount: displayFrontRowCount,
            generalCount: displayGeneralCount,
            price: totalPrice,
            paymentId: response.razorpay_payment_id,
            combo, // send combo info to backend
            user: {
              name: user?.name || '',
              email: user?.email || '',
            }
          })
        })
        .then(res => res.json())
        .then(data => {
          localStorage.removeItem("seatSelection");
          navigate('/confirmation', {
            state: {
              frontRowSeats,
              frontRowCount,
              generalCount,
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
        name: user?.name || '',
        email: user?.email || '',
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
          <p><strong>Selection:</strong> {seatSummary || 'None'}</p>
          {combo === "frontrow2" && (
            <p style={{ color: "#388e3c", fontWeight: 600 }}>Combo Applied: 2 Front Row Tickets for ₹1500</p>
          )}
          {combo === "general4" && (
            <p style={{ color: "#388e3c", fontWeight: 600 }}>Combo Applied: 4 General Tickets for ₹2199</p>
          )}
          <p><strong>Total Price:</strong> ₹{totalPrice}</p>
        </div>
        {/* Combo selection UI */}
        
        <button className="pay-now-button" onClick={handlePayment}>Pay Now</button>
      </div>
      <footer className="footer">© 2025 Qawwali Night • All Rights Reserved</footer>
    </div>
  );
}

export default CheckoutStyled;
