import { Routes, Route } from 'react-router-dom';
import { useUser } from "@clerk/clerk-react";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import Confirmation from './pages/Confirmation';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import SeatSelectionPage from './pages/SeatSelectionPage';
import SeatSelection from './pages/SeatSelection';
import AdminDashboard from "./pages/AdminDashboard";
import MyBookings from "./pages/MyBookings";
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';

const ADMIN_EMAILS = [
  "shaikhdanishpc@gmail.com",
  "admin2@example.com"
  // Add more allowed admin emails here
];

function App() {
  const { user } = useUser();

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Allow Clerk sub-routes */}
        <Route path="/sign-in/*" element={<SignInPage />} />
        <Route path="/sign-up/*" element={<SignUpPage />} />

        <Route path="/seats" element={<SeatSelection />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route
          path="/admin-dashboard"
          element={
            user && ADMIN_EMAILS.includes(user.primaryEmailAddress?.emailAddress) ? (
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

        {/* Protected Route Example */}
        <Route path="/protected-seats" element={
          <>
            <SignedIn>
              <SeatSelectionPage />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        } />
      </Routes>
      <Footer />
    </>
  );
}

export default App;