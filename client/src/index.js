// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import 'bootstrap/dist/css/bootstrap.min.css';
// // import 'bootstrap-icons/font/bootstrap-icons.css';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // // If you want to start measuring performance in your app, pass a function
// // // to log results (for example: reportWebVitals(console.log))
// // // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';
// // import './index.css';
// import './styles/index.css'; // Adjust the path as necessary
// import reportWebVitals from './reportWebVitals';
// import 'bootstrap/dist/css/bootstrap.min.css';

// import { ClerkProvider } from '@clerk/clerk-react';
// import { BrowserRouter } from 'react-router-dom';

// // ✅ Replace with your actual Clerk Publishable Key
// // const clerkPubKey = "pk_test_Y29tcGxldGUtcHVwLTg0LmNsZXJrLmFjY291bnRzLmRldiQ";

// const clerkPubKey = "";
// const domain="accounts.zesthausevents.com"

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <ClerkProvider publishableKey={clerkPubKey}>
//     <BrowserRouter>
//       <React.StrictMode>
//         <App />
//       </React.StrictMode>
//     </BrowserRouter>
//   </ClerkProvider>
// );

// reportWebVitals();


// final 
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
);

reportWebVitals();
