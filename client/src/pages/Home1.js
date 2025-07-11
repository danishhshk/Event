import React, { useState } from "react";
import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
// import "../LandingPage.css";
import "../styles/LandingPage.css"; // Adjust the path as necessary

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f9f6f1] text-black font-serif">


      {/* Hero Section */}
      <section className="hero">
        <h2 className="hero-title">Experience the Magic of Sufi Qawwali</h2>
        <p className="hero-subtitle">
          Join us for <strong>Jashn-e-Qawwal</strong>, a soul-stirring evening of traditional music and spiritual rhythm at one of Mumbai’s finest venues.
        </p>
        <Button className="cta-button" onClick={() => navigate('/seats')}>Book Now</Button>
      </section>

      {/* Event Details Section */}
      <section id="events" className="event-layout">
        <div className="event-about">
          <h3 className="section-heading">Jashn-e-Qawwal: A Soulful Qawwali Night</h3>
          {/* <img src="/event-promo.jpg" alt="Event Promo" className="event-image" style={{ borderRadius: '1rem', marginBottom: '1rem' }} /> */}
          <p className="about-text" style={{ textAlign: "left" }}>
            Witness the hilarious new material... Experience the timeless magic of Sufi Qawwali at <strong>Jashn-e-Qawwal</strong>, presented by Zesthaus Events. Let the mesmerizing voices and spiritual melodies transport you to a world of divine rhythm and poetic beauty.
          </p>
         {/* <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <span className="tag">Qawwali</span>
          <span className="tag">Sufi Music</span>
</div> */}

        </div>
         <div className="event-details-box">
             <p><strong>Date:</strong>  25 July 2025 </p>
             <p><strong>Time:</strong> 7:00 PM</p>
             <p><strong>Duration:</strong> 3 Hours</p>
             <p><strong>Age Limit:</strong> 16yrs+</p>
             <p><strong>Language:</strong> Hindi & Urdu</p>
             <p><strong>Genre:</strong> Qawwali / Sufi Music</p>
             <p><strong>Venue:</strong> SANSKRUTI BANQUET, Grant Road West, Mumbai</p>
             <div class="sc-u8qrk-0 gPGKzX"><hr height="1" class="sc-u8qrk-1 gBCss"></hr></div>
             <p style={{ color: '#D35400', fontWeight: 500 }}>599 Only! – Filling Fast</p>
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

      
    </div>
  );
}
