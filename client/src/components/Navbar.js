import React, { useState } from 'react';
import {
  SignedIn,
  SignedOut,
  UserButton,
  useUser
} from '@clerk/clerk-react';
import { Menu } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const fullName = isLoaded && user
    ? user.fullName || `${user.firstName || ''} ${user.lastName || ''}`.trim()
    : '';

  // Helper to scroll to section after navigating home
  const handleNavClick = (sectionId) => (e) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/", { replace: false });
      // Wait for navigation, then scroll
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  return (
    <header className="header">
      <a href="/" style={{ textDecoration: "none", color: "inherit" }}>
        <div className="logo-text">
          <span className="zesthaus">ZESTHAUS</span>
          <span className="events">EVENTS</span>
        </div>
      </a>

      <Menu
        className="menu-icon"
        onClick={() => setMenuOpen(!menuOpen)}
      />

      <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
        <a href="#events" className="menu-link" onClick={handleNavClick("events")}>Events</a>
        <a href="#about" className="menu-link" onClick={handleNavClick("about")}>About</a>
        <a href="#contact" className="menu-link" onClick={handleNavClick("contact")}>Contact</a>
        <SignedOut>
          <a href="/sign-in" className="menu-link">Sign In</a>
          <a href="/sign-up" className="menu-link">Sign Up</a>
        </SignedOut>
        <SignedIn>
          <a href="/my-bookings" className="menu-link">My Bookings</a>
          <span style={{ marginLeft: "1rem", marginRight: "0.5rem" }}>
            {fullName ? `Hello, ${fullName}` : 'Hello'}
          </span>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </nav>
    </header>
  );
}

export default Navbar;