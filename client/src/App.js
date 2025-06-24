// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
// import Home from './pages/Home';
// import Checkout from './pages/Checkout';
// import Confirmation from './pages/Confirmation';
// // import Events from './pages/Events'; // upcoming

// function App() {
//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/checkout" element={<Checkout />} />
//         <Route path="/confirmation" element={<Confirmation />} />
//         {/* <Route path="/events" element={<Events />} /> */}
//       </Routes>
//       <Footer />
//     </Router>
//   );
// }

// export default App;


import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import Confirmation from './pages/Confirmation';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import SeatSelectionPage from './pages/SeatSelectionPage';
import SeatSelection from './pages/SeatSelection';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/seats" element={<SeatSelection />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/confirmation" element={<Confirmation />} />

        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />

        {/* Protected Route */}
        <Route path="/seats" element={
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
