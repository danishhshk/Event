// import { useNavigate } from "react-router-dom";
// import { useUser, SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/clerk-react";

// function Home() {
//   const navigate = useNavigate();
//   const { user } = useUser();

//   return (
//     <div className="bg-light text-center py-5">
//       <div className="container">
//         <img 
//           src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=1350&q=80"
//           alt="Qawwali Night"
//           className="img-fluid rounded mb-4"
//         />

//         <h1 className="display-4 fw-bold text-danger">🎶 Qawwali Night 2025</h1>
        
//         <p className="lead mt-3">
//           Join us for a soulful evening with renowned Qawwali artists <br />
//           <b>15th July 2025 | Mumbai</b>
//         </p>

//         <hr className="my-4" />

//         <SignedIn>
//           <p className="mb-3">Welcome back, <strong>{user?.firstName || 'Guest'}</strong>!</p>
//           <button onClick={() => navigate('/seats')} className="btn btn-success btn-lg">
//             Book Your Seat
//           </button>
//         </SignedIn>

//         <SignedOut>
//           <p className="mb-3">Please sign in to book your ticket:</p>
//           <SignInButton mode="modal">
//             <button className="btn btn-primary me-2">Sign In</button>
//           </SignInButton>
//           <SignUpButton mode="modal">
//             <button className="btn btn-outline-primary">Sign Up</button>
//           </SignUpButton>
//         </SignedOut>
//       </div>
//     </div>
//   );
// }

// export default Home;


// src/pages/Home.js
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="bg-light text-center py-5">
      <div className="container">
        <h1 className="display-4 fw-bold text-danger">🎶 Qawwali Night 2025</h1>
        <p className="lead mt-3">
          Join us for a soulful Qawwali evening with renowned artists, on <b>15th July 2025</b> in <b>Mumbai</b>.
        </p>
        <hr className="my-4" />
        <button onClick={() => navigate('/seats')} className="btn btn-success btn-lg mt-3">
          Book Your Seat Now
        </button>
      </div>
    </div>
  );
}

export default Home;
