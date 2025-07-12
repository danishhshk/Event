import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import Confirmation from './pages/Confirmation';
import SeatSelectionPage from './pages/SeatSelectionPage';
import SeatSelection from './pages/SeatSelection';
import AdminDashboard from "./pages/AdminDashboard";
import MyBookings from "./pages/MyBookings";
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';

const ADMIN_EMAILS = [
  "shaikhdanishpc@gmail.com",
  "aaryanhashmi002@gmail.com",
  "ansarialtamashshamim@gmail.com"
  // Add more allowed admin emails here
];

function isAdmin() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return ADMIN_EMAILS.includes(user.email);
}

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/seats" element={<SeatSelection />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route
          path="/admin-dashboard"
          element={
            isAdmin() ? (
              <AdminDashboard />
            ) : (
              <div className="container mt-5">
                <h3>Access Denied</h3>
                <p>You are not authorized to view this page.</p>
              </div>
            )
          }
        />
        <Route path="/my-bookings" element={<MyBookings />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;