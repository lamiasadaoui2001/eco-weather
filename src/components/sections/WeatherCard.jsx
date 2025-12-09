// src/components/sections/WeatherCard.jsx
import React from "react";
import "./WeatherCard.css";
const WeatherCard = ({ city = "Rennes", temp = 18, condition = "Partiellement nuageux", icon = "🌤️" }) => {
  return (
    <div className="weather-card">
      <h2>{city}</h2>
      <div className="weather-info">
        <span className="weather-icon">{icon}</span>
        <span className="weather-temp">{temp}°C</span>
      </div>
      <p>{condition}</p>
    </div>
  );
};

export default WeatherCard;