// function Confirmation() {
//   return (
//     <div className="container text-center mt-5">
//       <h2 className="text-success">✅ Booking Confirmed!</h2>
//       <p>Thank you for booking your seat at the Qawwali Night 2025.</p>
//       <p>Check your email for confirmation.</p>
//     </div>
//   );
// }
// export default Confirmation;


import { useLocation } from 'react-router-dom';

function Confirmation() {
  const { state } = useLocation();
  const frontRowSeats = state?.frontRowSeats || [];
  const frontRowCount = state?.frontRowCount || 0;
  const generalCount = state?.generalCount || 0;
  const price = state?.totalPrice || 0;
  const paymentId = state?.paymentId;

  return (
    <div className="container py-5 text-center">
      <h2 className="text-success">Booking Confirmed ✅</h2>
      {frontRowSeats.length > 0 && (
        <p>Front Row Seats: {frontRowSeats.join(', ')}</p>
      )}
      {generalCount > 0 && (
        <p>General Tickets: {generalCount}</p>
      )}
      <p>Total Paid: ₹{price}</p>
      {paymentId && <p>Payment ID: {paymentId}</p>}
      <p>🎶 See you at the Qawwali Night!</p>
    </div>
  );
}

export default Confirmation;
