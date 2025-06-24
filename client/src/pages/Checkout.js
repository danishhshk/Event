import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '', email: '', tickets: 1
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = e => {
    e.preventDefault();
    console.log("Booking Confirmed:", formData);
    navigate('/confirmation');
  }

  

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center text-primary">🎟️ Book Your Ticket</h2>
      <form onSubmit={handleSubmit} className="w-50 mx-auto">
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input type="text" name="name" required className="form-control" onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input type="email" name="email" required className="form-control" onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">No. of Tickets</label>
          <input type="number" name="tickets" min="1" className="form-control" onChange={handleChange} />
        </div>
        <button className="btn btn-danger w-100">Proceed to Payment</button>
      </form>
    </div>
  );
}
export default Checkout;
