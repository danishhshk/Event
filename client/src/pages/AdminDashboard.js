import React, { useEffect, useState } from "react";
import axios from "axios";
import { CSVLink } from "react-csv";

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [offlineForm, setOfflineForm] = useState({
    name: "",
    email: "",
    seatType: "",
    price: "",
  });

  const seatTypePrices = {
    general: 599,
    frontRow: 799,
    VIP: 5000,
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/admin/bookings", {
        headers: {
          Authorization: "Bearer supersecrettoken123",
        },
      })
      .then((res) => {
        setBookings(res.data);
        setFilteredBookings(res.data);
      })
      .catch((err) => console.error("Failed to fetch bookings:", err));
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = bookings.filter((booking) =>
      [
        booking.user?.name || "",
        booking.user?.email || "",
        (booking.seats || []).join(", "),
      ].some((field) => field.toLowerCase().includes(query))
    );

    setFilteredBookings(filtered);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;
    try {
      await axios.delete(`http://localhost:5000/admin/bookings/${id}`, {
        headers: { Authorization: "Bearer supersecrettoken123" },
      });
      setBookings((prev) => prev.filter((b) => b._id !== id));
      setFilteredBookings((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      alert("Failed to delete booking.");
    }
  };

  const handleOfflineChange = (e) => {
    const { name, value } = e.target;
    if (name === "seatType") {
      setOfflineForm((prev) => ({
        ...prev,
        seatType: value,
        price: seatTypePrices[value] || "",
      }));
    } else {
      setOfflineForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleOfflineSubmit = async (e) => {
    e.preventDefault();
    const payId =
      "OFFLINE-" + Math.random().toString(36).substr(2, 8).toUpperCase();
    try {
      await axios.post(
        "http://localhost:5000/admin/offline-booking",
        {
          user: { name: offlineForm.name, email: offlineForm.email },
          seats: [offlineForm.seatType], // Now an array with seat type
          price: Number(offlineForm.price),
          paymentId: payId,
        },
        {
          headers: { Authorization: "Bearer supersecrettoken123" },
        }
      );
      setShowModal(false);
      setOfflineForm({ name: "", email: "", seatType: "", price: "" });
      // Optionally, refresh bookings
      window.location.reload();
    } catch {
      alert("Failed to add offline booking.");
    }
  };

  // Prepare CSV data with readable fields
  const csvData = filteredBookings.map((booking) => ({
    Name: booking.user?.name || "",
    Email: booking.user?.email || "",
    Seats: (booking.seats || []).join(", "),
    Price: booking.price,
    "Payment ID": booking.paymentId,
    "Booked At":
      booking.timestamp && new Date(booking.timestamp).toLocaleString(),
  }));

  return (
    <div className="container mt-4">
      <h2>Admin Dashboard – All Bookings</h2>

      <input
        type="text"
        className="form-control my-3"
        placeholder="Search by name, email or seat..."
        value={searchQuery}
        onChange={handleSearch}
      />

      <p className="lead">
        Total Bookings: <strong>{filteredBookings.length}</strong>
      </p>

      <CSVLink
        data={csvData}
        filename={"bookings.csv"}
        className="btn btn-success mb-3"
      >
        Export to CSV
      </CSVLink>
      <button className="btn btn-primary mb-3" onClick={() => setShowModal(true)}>
  Add Offline Booking
</button>

      <div className="table-responsive">
        <table className="table table-bordered table-striped mt-2">
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Seats</th>
              <th>Price</th>
              <th>Payment ID</th>
              <th>Booked At</th>
              <th>Used</th>
              <th>Actions</th> {/* New column */}
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking.user?.name || "-"}</td>
                <td>{booking.user?.email || "-"}</td>
                <td>{(booking.seats || []).join(", ")}</td>
                <td>₹{booking.price}</td>
                <td>{booking.paymentId}</td>
                <td>
                  {booking.timestamp
                    ? new Date(booking.timestamp).toLocaleString()
                    : "-"}
                </td>
                <td>{booking.used ? "Yes" : "No"}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(booking._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
  <div className="modal" style={{
    position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
    background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center"
  }}>
    <form style={{ background: "#fff", padding: 24, borderRadius: 8, minWidth: 320 }}
      onSubmit={handleOfflineSubmit}>
      <h4>Add Offline Booking</h4>
      <input className="form-control mb-2" name="name" placeholder="Name" required value={offlineForm.name} onChange={handleOfflineChange} />
      <input className="form-control mb-2" name="email" placeholder="Email" required value={offlineForm.email} onChange={handleOfflineChange} />
      <select
    className="form-control mb-2"
    name="seatType"
    required
    value={offlineForm.seatType || ""}
    onChange={handleOfflineChange}
  >
    <option value="">Select Seat Type</option>
    <option value="general">General - ₹599</option>
    <option value="frontRow">Front Row - ₹799</option>
    <option value="VIP">VIP - ₹5000</option>
</select>
      <input
  className="form-control mb-2"
  name="price"
  type="number"
  placeholder="Price"
  required
  value={offlineForm.price}
  onChange={handleOfflineChange}
/>
      <button className="btn btn-success" type="submit">Add Booking</button>
      <button className="btn btn-secondary ms-2" type="button" onClick={() => setShowModal(false)}>Cancel</button>
    </form>
  </div>
)}

    </div>
  );
};

export default AdminDashboard;