import React, { useState } from "react";
import Button from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";
import { CalendarDays, MapPin, Menu } from "lucide-react";

import "../styles/LandingPage.css";

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f9f6f1] text-black font-serif">
      {/* Header */}
      <header className="header">
        <div className="logo-text">
  <span className="zesthaus">ZESTHAUS</span>
  <span className="events">EVENTS</span>
</div>

        <Menu className="menu-icon" onClick={() => setMenuOpen(!menuOpen)} />
        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          <a href="#events">Events</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <h2 className="hero-title">Experience Events with Elegance</h2>
        <p className="hero-subtitle">
          Join us at Zesthaus Events, where we curate unforgettable experiences in
          the most sophisticated and luxurious manner.
        </p>
        <Button className="cta-button">Book Now</Button>
      </section>

      <section id="events" className="event-layout">
  {/* Left - Event Image and Description */}
  <div className="event-about">
    <h3 className="section-heading">Anubhav Singh Bassi: New Material</h3>
    <img src="/event-promo.jpg" alt="Event Promo" className="event-image" style={{ borderRadius: '1rem', marginBottom: '1rem' }} />
    <p className="about-text" style={{ textAlign: "left" }}>
      Witness the hilarious new material by Anubhav Singh Bassi, India’s most loved stand-up comedian. This time, he brings a brand-new set of jokes and stories that are sure to leave you in stitches. Perfectly curated for a night of unlimited fun and entertainment!
    </p>
    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
      <span className="tag">Stand-up Comedy</span>
      <span className="tag">Live Show</span>
    </div>
  </div>

  {/* Right - Sticky Details Box */}
  <div className="event-details-box">
    <p><strong>Date:</strong> 26 July 2025</p>
    <p><strong>Time:</strong> 7:15 PM</p>
    <p><strong>Duration:</strong> 2 Hours</p>
    <p><strong>Age Limit:</strong> 16yrs+</p>
    <p><strong>Language:</strong> Hindi</p>
    <p><strong>Genre:</strong> Comedy</p>
    <p><strong>Venue:</strong> Jio World Centre, Mumbai</p>
    <p style={{ color: '#D35400', fontWeight: 500 }}>
      <span style={{ textDecoration: "line-through", color: "#b71c1c", fontWeight: 400, marginRight: 8 }}>
        ₹999
      </span>
      <span style={{ color: "#388e3c", fontWeight: 600 }}>₹799 onwards</span> – Filling Fast
    </p>
    <Button className="reserve-button" style={{ marginTop: '1rem' }}>
      Book Now
    </Button>
  </div>
</section>


      {/* About Section */}
      <section id="about" className="about-section">
        <h3 className="section-heading">About Zesthaus</h3>
        <p className="about-text">
          At Zesthaus Events, we specialize in creating premium experiences that blend art,
          performance, and culture. From stand-up shows to immersive festivals, our goal is to
          deliver exceptional moments tailored to sophisticated audiences.
        </p>
      </section>

      {/* Terms & Conditions */}
      <section className="about-section" id="terms">
        <h3 className="section-heading">Terms & Conditions</h3>
        <ul className="about-text terms-list">
          <li>Tickets are non-refundable and non-transferable.</li>
          <li>Entry is subject to QR code scanning and security checks. ID proof may be required.</li>
          <li>Outside food, beverages, and illegal items are prohibited.</li>
          <li>Only individuals aged 16 and above will be permitted entry.</li>
          <li>Event lineup and schedule are subject to change without notice.</li>
        </ul>
      </section>

      {/* Footer */}
      <footer id="contact" className="footer">
        <p className="contact-text">Contact us: hello@zesthausevents.com</p>
        <p className="copyright">&copy; 2025 Zesthaus Events. All rights reserved.</p>
      </footer>
    </div>
  );
}
