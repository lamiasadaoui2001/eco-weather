import React from "react";
import "./App.css";
import Navbar from "./components/sections/Navbar/Navbar";
import Home from "./components/sections/Home";

function App() {
  return (
    <main className="font-body">
    
    <Navbar/>
      <Home />
    </main>
  );
}

export default App;
