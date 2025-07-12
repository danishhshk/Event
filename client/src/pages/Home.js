// // import React, { useState } from "react";
// // import Button from "../components/ui/Button";
// // import { useNavigate } from "react-router-dom";
// // import { Menu } from "lucide-react";
// // // import "../LandingPage.css";
// // import "../styles/LandingPage.css"; // Adjust the path as necessary

// // export default function Home() {
// //   const [menuOpen, setMenuOpen] = useState(false);
// //   const navigate = useNavigate();

// //   return (
// //     <div className="min-h-screen bg-[#f9f6f1] text-black font-serif">


// //       {/* Hero Section */}
// //       <section className="hero">
// //         <h2 className="hero-title">Experience Events with Elegance</h2>
// //         <p className="hero-subtitle">
// //           Join us at Zesthaus Events, where we curate unforgettable experiences in
// //           the most sophisticated and luxurious manner.
// //         </p>
// //         <Button className="cta-button" onClick={() => navigate('/seats')}>Book Now</Button>
// //       </section>

// //       {/* Event Details Section */}
// //       <section id="events" className="event-layout">
// //         <div className="event-about">
// //           <h3 className="section-heading">Anubhav Singh Bassi: New Material</h3>
// //           <img src="/event-promo.jpg" alt="Event Promo" className="event-image" style={{ borderRadius: '1rem', marginBottom: '1rem' }} />
// //           <p className="about-text" style={{ textAlign: "left" }}>
// //             Witness the hilarious new material by Anubhav Singh Bassi, India’s most loved stand-up comedian. This time, he brings a brand-new set of jokes and stories that are sure to leave you in stitches. Perfectly curated for a night of unlimited fun and entertainment!
// //           </p>
// //           <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
// //             <span className="tag">Stand-up Comedy</span>
// //             <span className="tag">Live Show</span>
// //           </div>
// //         </div>
// //         <div className="event-details-box">
// //           <p><strong>Date:</strong> 30 June – 1 Aug 2025</p>
// //           <p><strong>Time:</strong> 7:15 PM</p>
// //           <p><strong>Duration:</strong> 2 Hours</p>
// //           <p><strong>Age Limit:</strong> 16yrs+</p>
// //           <p><strong>Language:</strong> Hindi</p>
// //           <p><strong>Genre:</strong> Comedy</p>
// //           <p><strong>Venue:</strong> Jio World Centre, Mumbai</p>
// //           <p style={{ color: '#D35400', fontWeight: 500 }}>₹999 onwards – Filling Fast</p>
// //           <Button className="reserve-button" style={{ marginTop: '1rem' }} onClick={() => navigate('/seats')}>
// //             Book Now
// //           </Button>
// //         </div>
// //       </section>

// //       {/* About Section */}
// //       <section id="about" className="about-section">
// //         <h3 className="section-heading">About Zesthaus</h3>
// //         <p className="about-text">
// //           At Zesthaus Events, we specialize in creating premium experiences that blend art,
// //           performance, and culture. From stand-up shows to immersive festivals, our goal is to
// //           deliver exceptional moments tailored to sophisticated audiences.
// //         </p>
// //       </section>

// //       {/* Terms & Conditions */}
// //       <section className="about-section" id="terms">
// //         <h3 className="section-heading">Terms & Conditions</h3>
// //         <ul className="about-text terms-list">
// //           <li>Tickets are non-refundable and non-transferable.</li>
// //           <li>Entry is subject to QR code scanning and security checks. ID proof may be required.</li>
// //           <li>Outside food, beverages, and illegal items are prohibited.</li>
// //           <li>Only individuals aged 16 and above will be permitted entry.</li>
// //           <li>Event lineup and schedule are subject to change without notice.</li>
// //         </ul>
// //       </section>

      
// //     </div>
// //   );
// // }



// import React, { useState } from "react";
// import Button from "../components/ui/Button";
// import { useNavigate } from "react-router-dom";
// import { Menu } from "lucide-react";
// // import "../LandingPage.css";
// import "../styles/LandingPage1.css"; // Adjust the path as necessary

// export default function Home() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen bg-[#f9f6f1] text-black font-serif">


//       {/* Hero Section */}
//       <section className="hero">
//         <h2 className="hero-title">Experience the Magic of Sufi Qawwali</h2>
//         <p className="hero-subtitle">
//           Join us for <strong>Jashn-e-Qawwal</strong>, a soul-stirring evening of traditional music and spiritual rhythm at one of Mumbai’s finest venues.
//         </p>
//         <Button className="cta-button" onClick={() => navigate('/seats')}>Book Now</Button>
//       </section>

//       {/* Event Details Section */}
//       <section id="events" className="event-layout">
//         <div className="event-about">
//           <h3 className="section-heading">Jashn-e-Qawwa: A Soulful Qawwali Night</h3>
//           {/* <img src="/event-promo.jpg" alt="Event Promo" className="event-image" style={{ borderRadius: '1rem', marginBottom: '1rem' }} /> */}
//           <p className="about-text" style={{ textAlign: "left" }}>
//             Witness the hilarious new material... Experience the timeless magic of Sufi Qawwali at <strong>Jashn-e-Qawwali</strong>, presented by Zesthaus Events. Let the mesmerizing voices and spiritual melodies transport you to a world of divine rhythm and poetic beauty.
//           </p>
//          {/* <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
//           <span className="tag">Qawwali</span>
//           <span className="tag">Sufi Music</span>
// </div> */}

//         </div>
//          <div className="event-details-box">
//              <p><strong>Date:</strong>  25 July 2025 </p>
//              <p><strong>Time:</strong> 7:00 PM</p>
//              <p><strong>Duration:</strong> 3 Hours</p>
//              <p><strong>Age Limit:</strong> 16yrs+</p>
//              <p><strong>Language:</strong> Hindi & Urdu</p>
//              <p><strong>Genre:</strong> Qawwali / Sufi Music</p>
//              <p><strong>Venue:</strong> SANSKRUTI BANQUET, Grant Road West, Mumbai</p>
//              <div class="sc-u8qrk-0 gPGKzX"><hr height="1" class="sc-u8qrk-1 gBCss"></hr></div>
//              <p style={{ color: '#D35400', fontWeight: 500 }}>599 Only! – Filling Fast</p>
//              <Button className="reserve-button" style={{ marginTop: '1rem' }}>
//                Book Now
//              </Button>
//            </div>
//       </section>

//       {/* About Section */}
//       <section id="about" className="about-section">
//         <h3 className="section-heading">About Zesthaus</h3>
//         <p className="about-text">
//           At Zesthaus Events, we specialize in creating premium experiences that blend art,
//           performance, and culture. From stand-up shows to immersive festivals, our goal is to
//           deliver exceptional moments tailored to sophisticated audiences.
//         </p>
//       </section>

//       {/* Terms & Conditions */}
//       <section className="about-section" id="terms">
//         <h3 className="section-heading">Terms & Conditions</h3>
//         <ul className="about-text terms-list">
//           <li>Tickets are non-refundable and non-transferable.</li>
//           <li>Entry is subject to QR code scanning and security checks. ID proof may be required.</li>
//           <li>Outside food, beverages, and illegal items are prohibited.</li>
//           <li>Only individuals aged 16 and above will be permitted entry.</li>
//           <li>Event lineup and schedule are subject to change without notice.</li>
//         </ul>
//       </section>

      
//     </div>
//   );
// }



import React, { useState } from "react";
import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import "../styles/LandingPage.css";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f9f6f1] text-black font-serif">
      {/* Hero Section */}
      <section className="hero">
        <h1>Experience the Magic of Sufi Qawwali</h1>
        <p>
          Join us for <strong>Jashn-e-Qawwali</strong>, a soul-stirring evening of traditional music and spiritual rhythm at one of Mumbai’s finest venues.
        </p>
        <Button className="cta-button" onClick={() => navigate('/seats')}>Book Now</Button>
      </section>

      {/* Event Details Section */}
      <section id="events" className="event-layout">
        <div className="event-about">
          <h3 className="section-heading">Jashn-e-Qawwali: A Soulful Qawwali Night</h3>
          <img src="/event-promo.jpg" alt="Event Promo" className="event-image" style={{ borderRadius: '1rem', marginBottom: '1rem' }} />
          <p className="about-text" style={{ textAlign: "left" }}>
            Experience the timeless magic of Sufi Qawwali at <strong>Jashn-e-Qawwali</strong>, presented by Zesthaus Events. Let the mesmerizing voices and spiritual melodies transport you to a world of divine rhythm and poetic beauty.
          </p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
            <span className="tag">Sufi Music</span>
            <span className="tag">Qawwali</span>
            <span className="tag">Live Performance</span>
          </div>
        </div>
        <div className="event-details-box">
          <ul>
            <li><strong>Date:</strong> 26 July 2025</li>
            <li><strong>Time:</strong> 7:00 PM</li>
            <li><strong>Duration:</strong> 3 Hours</li>
            <li><strong>Age Limit:</strong> 16yrs+</li>
            <li><strong>Language:</strong> Hindi & Urdu</li>
            <li><strong>Genre:</strong> Qawwali / Sufi Music</li>
            <li><strong>Venue:</strong> SANSKRUTI BANQUET, Grant Road West, Mumbai</li>
          </ul>
          <hr />
          <p style={{ color: '#D35400', fontWeight: 700, fontSize: '1.1rem' }}>
            🎟 <mark style={{ backgroundColor: '#fef5e7', padding: '0.2rem 0.4rem', borderRadius: '0.3rem' }}>
              <span style={{ textDecoration: "line-through", color: "#b71c1c", fontWeight: 400, marginRight: 8 }}>
                ₹799
              </span>
              <span style={{ color: "#388e3c", fontWeight: 700 }}>₹599 Only!</span> – Filling Fast
            </mark>
          </p>
          <Button className="reserve-button" onClick={() => navigate('/seats')} style={{ marginTop: '1rem' }}>
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
