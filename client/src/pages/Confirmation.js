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
  const seats = state?.selectedSeats || [];
  const price = state?.totalPrice || 0;

  return (
    <div className="container py-5 text-center">
      <h2 className="text-success">Booking Confirmed ✅</h2>
      <p>Seats: {seats.join(', ')}</p>
      <p>Total Paid: ₹{price}</p>
      <p>🎶 See you at the Qawwali Night!</p>
    </div>
  );
}

export default Confirmation;
