// import { SignUp } from '@clerk/clerk-react';

// const SignUpPage = () => (
// //   <div className="container mt-5">
// //     {/* <h2>Sign Up</h2> */}
// //     <SignUp routing="path" path="/sign-up" />
// //   </div>
// // );
// // export default SignUpPage;


// import { SignUp } from '@clerk/clerk-react';

// const SignUpPage = () => (
//   <div style={styles.container}>
//     <SignUp routing="path" path="/sign-up" signInUrl="/sign-in" />
//   </div>
// );

// const styles = {
//   container: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: '100vh',
//     backgroundColor: '#f5f5f5',
//   },
// };

// export default SignUpPage;



// src/pages/SignUpPage.js
import React, { useState } from "react";
import axios from "../utils/axios";
import "../styles/LandingPage.css";

const SignUpPage = () => {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", otp: "" });
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const sendOTP = async () => {
    setLoading(true);
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/auth/send-otp`, { email: form.email, forSignup: true });
      setOtpSent(true);
      alert("OTP sent to your email");
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const signup = async () => {
    setLoading(true);
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, {
        email: form.email,
        otp: form.otp,
        name: form.firstName + " " + form.lastName
      });
      alert("Signup successful. Please login.");
      window.location.href = "/sign-in";
    } catch (err) {
      alert(err?.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-bg">
      <div className="auth-center-box">
        <div className="logo-text" style={{ marginBottom: 24 }}>
          <span className="zesthaus">ZESTHAUS</span>
          <span className="events">EVENTS</span>
        </div>
        <div className="auth-card">
          <h2 className="auth-title">Sign Up</h2>
          {!otpSent ? (
            <>
              <input
                type="text"
                placeholder="First Name"
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                className="auth-input"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                className="auth-input"
              />
              <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="auth-input"
                autoComplete="email"
              />
              <button onClick={sendOTP} className="auth-button" disabled={loading}>
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>
            </>
          ) : (
            <>
              <input
                type="text"
                placeholder="Enter OTP"
                value={form.otp}
                onChange={(e) => setForm({ ...form, otp: e.target.value })}
                className="auth-input"
                autoComplete="one-time-code"
              />
              <button onClick={signup} className="auth-button" disabled={loading}>
                {loading ? "Creating Account..." : "Verify & Sign Up"}
              </button>
            </>
          )}
          <div className="auth-switch-text">
            Already have an account?{" "}
            <a href="/sign-in" className="auth-link">
              Sign In
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
