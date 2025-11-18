import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/sections/Navbar/Navbar";
import Home from "./components/sections/Home";
import Conseils from "./components/sections/Conseils";

function App() {
  return (
    <Router>
      <main className="font-body">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/advice" element={<Conseils />} />
          <Route path="/dash" element={<div>Dashboard</div>} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
