import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AboutDekusda from "./pages/About/AboutDekusda";
import AboutSDA from "./pages/About/AboutSDA";

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root "/" to AboutDekusda */}
        <Route path="/" element={<Navigate to="/about-dekusda" replace />} />
        
        {/* Actual pages */}
        <Route path="/about-dekusda" element={<AboutDekusda />} />
        <Route path="/about-sda" element={<AboutSDA />} />
      </Routes>
    </Router>
  );
}

export default App;
