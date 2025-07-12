const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const nodemailer = require("nodemailer");
const QRCode = require('qrcode');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(cors({
  origin: 'https://zesthausevents.com', // or your deployed frontend URL
  credentials: true
}));
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Connect to MongoDB using env variable
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ Mongo error:", err));

// Test Route
app.get('/', (req, res) => {
  res.send('API Running...');
});

// --- Models ---
const Booking = require('./models/Booking');
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: String,
});
const User = mongoose.models.User || mongoose.model('User', userSchema);

// --- Email Transporter ---
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// --- OTP Store (in-memory, for demo) ---
const otpStore = new Map();
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
function setOTP(email, otp) {
  otpStore.set(email, { otp, expires: Date.now() + 5 * 60 * 1000 }); // 5 min expiry
}
function getOTP(email) {
  const entry = otpStore.get(email);
  if (!entry) return null;
  if (Date.now() > entry.expires) {
    otpStore.delete(email);
    return null;
  }
  return entry.otp;
}
function deleteOTP(email) {
  otpStore.delete(email);
}

// --- Send OTP Endpoint ---
app.post('/auth/send-otp', async (req, res) => {
  const { email, forSignup } = req.body;
  if (!email) return res.status(400).json({ message: "Email required" });

  // Only send OTP for login if user exists
  if (!forSignup) {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not registered. Please sign up first." });
    }
  }

  const otp = generateOTP();
  setOTP(email, otp);

  // Send OTP via email (updated content)
  const mailOptions = {
    from: '"Zesthaus Events" <' + process.env.EMAIL_USER + '>',
    to: email,
    subject: "Zesthaus Events Email Verification Code",
    html: `
      <div style="font-family: Arial, sans-serif; color: #222;">
        <h2 style="color:#1e3c72;">Zesthaus Events – Email Verification</h2>
        <p>Dear Guest,</p>
        <p>Your verification code is:</p>
        <div style="font-size:2rem; font-weight:bold; letter-spacing:4px; margin:16px 0; color:#1e3c72;">${otp}</div>
        <p>This code is valid for 5 minutes. Please enter it on the website to verify your email and continue.</p>
        <p>If you did not request this code, you can safely ignore this email.</p>
        <br>
        <p>Best regards,<br>Zesthaus Events Team</p>
      </div>
    `
  };
  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: "OTP sent to your email" });
  } catch (err) {
    res.status(500).json({ message: "Failed to send OTP" });
  }
});

// --- Signup Endpoint ---
app.post('/auth/signup', async (req, res) => {
  const { email, otp, name } = req.body;
  if (!email || !otp || !name) return res.status(400).json({ message: "Email, name, and OTP required" });

  const validOtp = getOTP(email);
  if (!validOtp || validOtp !== otp) {
    return res.status(401).json({ message: "Invalid or expired OTP" });
  }
  deleteOTP(email);

  // Check if user already exists
  let user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ message: "User already exists. Please login." });
  }

  user = await User.create({ email, name });

  // Issue JWT
  const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, user });
});

// Backend: /auth/login
app.post('/auth/login', async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) return res.status(400).json({ message: "Email and OTP required" });

  const validOtp = getOTP(email);
  if (!validOtp || validOtp !== otp) {
    return res.status(401).json({ message: "Invalid or expired OTP" });
  }
  deleteOTP(email);

  // Only allow login if user exists
  let user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "User not registered. Please sign up first." });
  }

  // Issue JWT
  const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, user });
});

// Utility to check for double-booked front row seats
async function areFrontRowSeatsAvailable(seats) {
  if (!Array.isArray(seats) || seats.length === 0) return true;
  const bookings = await Booking.find({ frontRowSeats: { $in: seats } });
  return bookings.length === 0;
}

// Public booking route
app.post('/api/bookings', async (req, res) => {
  const { user, price, paymentId, frontRowSeats = [], frontRowCount = 0, generalCount = 0, vipTable, combo } = req.body;

  // Reject VIP bookings from public API
  if (vipTable) {
    return res.status(400).json({ message: "VIP bookings are only allowed via admin." });
  }

  // --- Combo price validation ---
  let expectedPrice = price;
  if (combo === "frontrow2") {
    expectedPrice = 1500;
    if (frontRowCount !== 2 || generalCount !== 0) {
      return res.status(400).json({ message: "Invalid combo selection." });
    }
  } else if (combo === "general4") {
    expectedPrice = 2199;
    if (frontRowCount !== 0 || generalCount !== 4) {
      return res.status(400).json({ message: "Invalid combo selection." });
    }
  } else {
    // Normal pricing
    expectedPrice = (frontRowCount * 799) + (generalCount * 599);
  }
  if (price !== expectedPrice) {
    return res.status(400).json({ message: "Price mismatch." });
  }
  // --- End combo price validation ---

  // Check for double-booked front row seats
  if (frontRowSeats.length > 0) {
    const available = await areFrontRowSeatsAvailable(frontRowSeats);
    if (!available) {
      return res.status(400).json({ message: "One or more front row seats are already booked." });
    }
  }

  try {
    const newBooking = new Booking({
      user,
      price,
      paymentId,
      frontRowSeats,
      frontRowCount,
      generalCount
    });

    // QR code logic (customize as needed)
    const qrData = JSON.stringify({
      bookingId: newBooking._id,
      frontRowSeats,
      frontRowCount,
      generalCount,
      name: user?.name || ""
    });
    const qrImage = await QRCode.toDataURL(qrData);
    newBooking.qrCode = qrImage;
    await newBooking.save();

    // Extract base64 data
    const base64Data = qrImage.replace(/^data:image\/png;base64,/, "");

    const userName = user?.name || "";
    const mailOptions = {
      from: '"Zesthaus Events" <zesthaus.events@gmail.com>',
      to: user.email,
      subject: "Jashn-e-Qawwali – Booking Confirmation",
      html: `
        <h2>Thank you for booking with Zesthaus Events!</h2>
        <p>Dear ${userName},</p>
        <p>Your booking for <strong>Jashn-e-Qawwali</strong> is confirmed.</p>
        <h3>📍 Venue:</h3>
        <p><strong>SANSKRUTI BANQUET</strong><br>Grant Road West, Mumbai</p>
        <h3>🕖 Date & Time:</h3>
        <p><strong>26 July 2025</strong> at <strong>7:00 PM</strong></p>
        <p>Please present the below QR code at the entrance. It is valid for one-time scan only:</p>
        <img src="cid:qrcode" alt="QR Code" style="max-width:200px;">
        <p>Looking forward to welcoming you!</p>
        <p>Warm regards,<br>Zesthaus Events Team</p>
        <h3>📌 Terms & Conditions</h3>
        <ul>
          <li>Tickets are non-refundable and non-transferable.</li>
          <li>Entry is subject to QR code scanning and security checks.</li>
          <li>ID proof may be required.</li>
          <li>No outside food, drinks, or prohibited items allowed.</li>
          <li>Only age 16+ allowed. Schedule subject to change.</li>
        </ul>
      `,
      attachments: [
        {
          filename: 'qrcode.png',
          content: base64Data,
          encoding: 'base64',
          cid: 'qrcode'
        }
      ]
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error('❌ Email error:', err);
      } else {
        console.log('📧 Email sent:', info.response);
      }
    });

    res.status(201).json({ message: "Booking saved successfully!", bookingId: newBooking._id });
  } catch (error) {
    console.error("❌ Error saving booking:", error);
    res.status(500).json({ message: "Failed to save booking" });
  }
});

// Admin route to get all bookings
app.get('/admin/bookings', async (req, res) => {
  const auth = req.headers.authorization;
  if (auth !== 'Bearer supersecrettoken123') {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const bookings = await Booking.find().sort({ timestamp: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch bookings' });
  }
});

app.post('/admin/verify-ticket', async (req, res) => {
  const auth = req.headers.authorization;
  if (auth !== 'Bearer supersecrettoken123') {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const { bookingId } = req.body;
  try {
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Ticket not found." });
    }
    if (booking.used) {
      return res.status(400).json({ message: "Ticket already used!" });
    }
    booking.used = true;
    await booking.save();
    return res.json({ message: "Ticket is valid! Marked as used.", booking });
  } catch (err) {
    return res.status(500).json({ message: "Verification failed." });
  }
});

app.get('/api/my-bookings', async (req, res) => {
  const userEmail = req.query.email;
  if (!userEmail) {
    return res.status(400).json({ message: "Email required" });
  }
  try {
    const bookings = await Booking.find({ "user.email": userEmail }).sort({ timestamp: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
});

app.delete('/admin/bookings/:id', async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: "Booking deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete booking" });
  }
});

// Admin/offline booking route
app.post('/admin/offline-booking', async (req, res) => {
  const { user, price, paymentId, frontRowSeats = [], frontRowCount = 0, generalCount = 0, vipTable } = req.body;

  // Check for double-booked front row seats
  if (frontRowSeats.length > 0) {
    const available = await areFrontRowSeatsAvailable(frontRowSeats);
    if (!available) {
      return res.status(400).json({ message: "One or more front row seats are already booked." });
    }
  }

  try {
    const newBooking = new Booking({
      user,
      price,
      paymentId,
      frontRowSeats,
      frontRowCount,
      generalCount,
      vipTable
    });

    // QR code logic (customize as needed)
    const qrData = JSON.stringify({
      bookingId: newBooking._id,
      frontRowSeats,
      frontRowCount,
      generalCount,
      vipTable,
      name: user?.name || ""
    });
    const qrImage = await QRCode.toDataURL(qrData);
    newBooking.qrCode = qrImage;
    await newBooking.save();

    // Extract base64 data
    const base64Data = qrImage.replace(/^data:image\/png;base64,/, "");

    const userName = user?.name || "";
    const mailOptions = {
      from: '"Zesthaus Events" <zesthaus.events@gmail.com>',
      to: user.email,
      subject: "Jashn-e-Qawwali – Booking Confirmation",
      html: `
        <h2>Thank you for booking with Zesthaus Events!</h2>
        <p>Dear ${userName},</p>
        <p>Your booking for <strong>Jashn-e-Qawwali</strong> is confirmed.</p>
        <h3>📍 Venue:</h3>
        <p><strong>SANSKRUTI BANQUET</strong><br>Grant Road West, Mumbai</p>
        <h3>🕖 Date & Time:</h3>
        <p><strong>26 July 2025</strong> at <strong>7:00 PM</strong></p>
        <p>Please present the below QR code at the entrance. It is valid for one-time scan only:</p>
        <img src="cid:qrcode" alt="QR Code" style="max-width:200px;">
        <p>Looking forward to welcoming you!</p>
        <p>Warm regards,<br>Zesthaus Events Team</p>
        <h3>📌 Terms & Conditions</h3>
        <ul>
          <li>Tickets are non-refundable and non-transferable.</li>
          <li>Entry is subject to QR code scanning and security checks.</li>
          <li>ID proof may be required.</li>
          <li>No outside food, drinks, or prohibited items allowed.</li>
          <li>Only age 16+ allowed. Schedule subject to change.</li>
        </ul>
      `,
      attachments: [
        {
          filename: 'qrcode.png',
          content: base64Data,
          encoding: 'base64',
          cid: 'qrcode'
        }
      ]
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error('❌ Email error:', err);
      } else {
        console.log('📧 Email sent:', info.response);
      }
    });

    res.json({ message: "Offline booking added and email sent", booking: newBooking });
  } catch (err) {
    res.status(500).json({ message: "Failed to add offline booking or send email" });
  }
});

// (Optional) Endpoint to get all booked front row seats
app.get('/api/booked-front-row-seats', async (req, res) => {
  const bookings = await Booking.find({}, 'frontRowSeats');
  const allSeats = bookings.flatMap(b => b.frontRowSeats);
  res.json({ bookedSeats: allSeats });
});

// Admin route to get all users
app.get('/admin/users', async (req, res) => {
  const auth = req.headers.authorization;
  if (auth !== 'Bearer supersecrettoken123') {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    const users = await User.find({}, { email: 1, name: 1, _id: 1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch users' });
  }
});

// --- Utility Functions ---
function getSeatType(seat) {
  if (typeof seat !== "string") return "";
  if (seat.startsWith("VIP-")) return "VIP";
  if (seat.startsWith("1-")) return "frontRow";
  if (seat.startsWith("2-")) return "general";
  if (seat.startsWith("R-")) return "general";
  if (["VIP", "frontRow", "general"].includes(seat)) return seat; // For offline dropdown
  return "";
}

// --- Start Server ---
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});