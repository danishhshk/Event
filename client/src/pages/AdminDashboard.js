import React, { useEffect, useState } from "react";
import axios from "axios";
import { CSVLink } from "react-csv";

const ALL_FRONT_ROW_SEATS = [
  ...Array.from({ length: 25 }, (_, i) => `A${i + 1}`),
  ...Array.from({ length: 25 }, (_, i) => `B${i + 1}`),
  ...Array.from({ length: 25 }, (_, i) => `C${i + 1}`),
];

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [offlineForm, setOfflineForm] = useState({
    name: "",
    email: "",
    seatType: "",
    ticketCount: "",
    price: "",
    vipTable: "",
    frontRowSeats: "",
  });
  const [bookedFrontRowSeats, setBookedFrontRowSeats] = useState([]);
  const [users, setUsers] = useState([]);

  const seatTypePrices = {
    general: 599,
    frontRow: 799,
    VIP: 9999,
  };

  useEffect(() => {
    axios
      .get("https://zesthaus-production.up.railway.app/admin/bookings", {
        headers: {
          Authorization: "Bearer supersecrettoken123",
        },
      })
      .then((res) => {
        setBookings(res.data);
        setFilteredBookings(res.data);

        // Collect all booked front row seats
        const booked = [];
        res.data.forEach((b) => {
          if (b.frontRowSeats && Array.isArray(b.frontRowSeats)) {
            booked.push(...b.frontRowSeats);
          }
        });
        setBookedFrontRowSeats(booked);
      })
      .catch((err) => console.error("Failed to fetch bookings:", err));

    // Fetch users
    axios
      .get(`${process.env.REACT_APP_API_URL}/admin/users`, {
        headers: { Authorization: "Bearer supersecrettoken123" },
      })
      .then((res) => setUsers(res.data))
      .catch(() => setUsers([]));
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = bookings.filter((booking) =>
      [
        booking.user?.name || "",
        booking.user?.email || "",
        (booking.frontRowSeats || []).join(", "),
        booking.generalCount ? `General x${booking.generalCount}` : "",
        booking.vipTable ? `VIP Table ${booking.vipTable}` : "",
      ].some((field) => field.toLowerCase().includes(query))
    );

    setFilteredBookings(filtered);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;
    try {
      await axios.delete(
        `https://zesthaus-production.up.railway.app/admin/bookings/${id}`,
        {
          headers: { Authorization: "Bearer supersecrettoken123" },
        }
      );
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
        ticketCount: "",
        vipTable: "",
        frontRowSeats: "",
      }));
    } else if (
      offlineForm.seatType === "frontRow" &&
      name === "ticketCount"
    ) {
      // Auto-assign next available seats
      const count = Math.max(0, Math.min(75 - bookedFrontRowSeats.length, Number(value)));
      const available = ALL_FRONT_ROW_SEATS.filter(
        (seat) => !bookedFrontRowSeats.includes(seat)
      );
      const assigned = available.slice(0, count);
      setOfflineForm((prev) => ({
        ...prev,
        ticketCount: value,
        frontRowSeats: assigned.join(","),
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

    let bookingPayload = {
      user: { name: offlineForm.name, email: offlineForm.email },
      price: Number(offlineForm.price),
      paymentId: payId,
    };

    if (offlineForm.seatType === "general") {
      bookingPayload.generalCount = Number(offlineForm.ticketCount);
    } else if (offlineForm.seatType === "frontRow") {
      // Use auto-assigned seats
      const seats = offlineForm.frontRowSeats
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      bookingPayload.frontRowSeats = seats;
      bookingPayload.frontRowCount = seats.length;
    } else if (offlineForm.seatType === "VIP") {
      bookingPayload.vipTable = offlineForm.vipTable;
    }

    try {
      await axios.post(
        "https://zesthaus-production.up.railway.app/admin/offline-booking",
        bookingPayload,
        {
          headers: { Authorization: "Bearer supersecrettoken123" },
        }
      );
      setShowModal(false);
      setOfflineForm({
        name: "",
        email: "",
        seatType: "",
        ticketCount: "",
        price: "",
        vipTable: "",
        frontRowSeats: "",
      });
      window.location.reload();
    } catch {
      alert("Failed to add offline booking.");
    }
  };

  // Prepare CSV data with readable fields
  const csvData = filteredBookings.map((booking) => ({
    Name: booking.user?.name || "",
    Email: booking.user?.email || "",
    "Front Row Seats": (booking.frontRowSeats || []).join(", "),
    "Front Row Count": booking.frontRowCount || "",
    "General Tickets": booking.generalCount || "",
    "VIP Table": booking.vipTable || "",
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
        <br />
        <span style={{ fontSize: "1rem", color: "#2563eb" }}>
          Front Row Seats: <strong>
            {filteredBookings.reduce((sum, b) => sum + (b.frontRowCount || (b.frontRowSeats ? b.frontRowSeats.length : 0)), 0)}
          </strong>
          &nbsp;|&nbsp;
          General Tickets: <strong>
            {filteredBookings.reduce((sum, b) => sum + (b.generalCount || 0), 0)}
          </strong>
          &nbsp;|&nbsp;
          VIP Tables: <strong>
            {filteredBookings.filter(b => b.vipTable).length}
          </strong>
        </span>
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
              <th>Front Row Seats</th>
              <th>Front Row Count</th>
              <th>General Tickets</th>
              <th>VIP Table</th>
              <th>Price</th>
              <th>Payment ID</th>
              <th>Booked At</th>
              <th>Used</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking.user?.name || "-"}</td>
                <td>{booking.user?.email || "-"}</td>
                <td>{(booking.frontRowSeats || []).join(", ")}</td>
                <td>{booking.frontRowCount || "-"}</td>
                <td>{booking.generalCount || "-"}</td>
                <td>{booking.vipTable || "-"}</td>
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
              <option value="VIP">VIP Table - ₹9999</option>
            </select>
            {/* Show ticket count for general */}
            {offlineForm.seatType === "general" && (
              <input
                className="form-control mb-2"
                name="ticketCount"
                type="number"
                min={1}
                max={225}
                placeholder="No. of General Tickets"
                required
                value={offlineForm.ticketCount}
                onChange={handleOfflineChange}
              />
            )}
            {/* Show ticket count for front row and auto-assign seats */}
            {offlineForm.seatType === "frontRow" && (
              <>
                <input
                  className="form-control mb-2"
                  name="ticketCount"
                  type="number"
                  min={1}
                  max={75 - bookedFrontRowSeats.length}
                  placeholder="No. of Front Row Tickets"
                  required
                  value={offlineForm.ticketCount}
                  onChange={handleOfflineChange}
                />
                {offlineForm.frontRowSeats && (
                  <div style={{ fontSize: "0.98rem", marginBottom: 8 }}>
                    Assigned Seats: {offlineForm.frontRowSeats}
                  </div>
                )}
              </>
            )}
            {/* Show VIP table number for VIP */}
            {offlineForm.seatType === "VIP" && (
              <input
                className="form-control mb-2"
                name="vipTable"
                placeholder="VIP Table Number (e.g. 1, 2, 3, 4)"
                required
                value={offlineForm.vipTable}
                onChange={handleOfflineChange}
              />
            )}
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

      <h3 className="mt-5">Registered Users</h3>
      <div className="table-responsive">
        <table className="table table-bordered table-striped mt-2">
          <thead className="thead-dark">
            <tr>
              <th>Email</th>
              <th>Name</th>
              <th>User ID</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>{u.email}</td>
                <td>{u.name}</td>
                <td>{u._id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default AdminDashboard;