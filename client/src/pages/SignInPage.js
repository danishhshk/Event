// import { SignIn } from "@clerk/clerk-react";
// import { useLocation } from "react-router-dom";

// const styles = {
//   container: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     minHeight: '100vh',
//     backgroundColor: '#f5f5f5',
//     width: '100vw',
//   },
// };

// export default function SignInPage() {
//   const location = useLocation();
//   const params = new URLSearchParams(location.search);
//   const redirectTo = params.get("redirectTo") || "/";

//   return (
//     <div style={styles.container}>
//       <SignIn routing="path" path="/sign-in" redirectUrl={redirectTo} />
//     </div>
//   );
// }



// src/pages/SignInPage.js
import React, { useState, useEffect } from "react";
import axios from "../utils/axios";
import "../styles/LandingPage.css";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem("pendingEmail");
    const savedOtpSent = localStorage.getItem("pendingOtpSent");
    if (savedEmail) setEmail(savedEmail);
    if (savedOtpSent === "true") setOtpSent(true);
  }, []);

  const sendOTP = async () => {
    setLoading(true);
    try {
      localStorage.setItem("pendingEmail", email);
      localStorage.setItem("pendingOtpSent", "true");
      await axios.post(`${process.env.REACT_APP_API_URL}/auth/send-otp`, { email });
      setOtpSent(true);
      alert("OTP sent to your email");
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const resendOTP = async (e) => {
    e.preventDefault();
    setResending(true);
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/auth/send-otp`, { email });
      alert("OTP resent to your email");
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to resend OTP");
    } finally {
      setResending(false);
    }
  };

  const login = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, { email, otp });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.removeItem("pendingEmail");
      localStorage.removeItem("pendingOtpSent");
      alert("Login successful");
      window.location.href = "/";
    } catch (err) {
      alert(err?.response?.data?.message || "Login failed");
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
          <h2 className="auth-title">Sign In</h2>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="auth-input"
            autoComplete="email"
          />
          {otpSent && (
            <>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="auth-input"
                autoComplete="one-time-code"
              />
              <div style={{ width: "100%", textAlign: "right", marginBottom: 8 }}>
                <a
                  href="#"
                  className="auth-link"
                  onClick={resendOTP}
                  style={{ fontSize: 14, cursor: resending ? "not-allowed" : "pointer" }}
                >
                  {resending ? "Resending..." : "Resend OTP"}
                </a>
              </div>
            </>
          )}
          <button
            onClick={otpSent ? login : sendOTP}
            className="auth-button"
            disabled={loading}
          >
            {loading ? "Please wait..." : otpSent ? "Verify & Login" : "Send OTP"}
          </button>
          <div className="auth-switch-text">
            New here?{" "}
            <a href="/sign-up" className="auth-link">
              Create an account
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
