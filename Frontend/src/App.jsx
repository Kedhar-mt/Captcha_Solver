import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import Router and Route
import Login from "./components/Login"; // Assuming you created Login.jsx inside the components folder
import Signup from "./components/Signup"; // Assuming you created Signup.jsx inside the components folder
import CaptchaSolver from "./components/CaptchaSolver";
import "./App.css"; // Your CSS file

const App = () => {
  return (
    <Router> {/* Wrap the app with Router for routing */}
      <Routes>
        {/* Define the routes */}
        <Route path="/:username" element={<CaptchaSolver />} /> {/* This will be the default page */}
        <Route path="/login" element={<Login />} /> {/* Login page */}
        <Route path="/signup" element={<Signup />} /> {/* Signup page */}
      </Routes>
    </Router>
  );
};

export default App;
