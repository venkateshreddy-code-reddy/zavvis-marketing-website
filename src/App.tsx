// src/App.tsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./Home";          // adjust path if needed
import CompanyPage from "./pages/CompanyPage";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      {/* Shared navbar for all pages */}
      <Navbar />

      {/* Page content */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/company" element={<CompanyPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
