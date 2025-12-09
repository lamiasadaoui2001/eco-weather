// src/components/sections/CitySelector.jsx
import React from "react";
import { CITY_NAMES } from "../../utils/cities"; // ✅ Nouvelle importation

const CitySelector = ({ onSelect }) => {
  return (
    <div className="city-selector">
      <label htmlFor="city">Choisissez une ville bretonne :</label>
      <select id="city" onChange={(e) => onSelect?.(e.target.value)}>
        {CITY_NAMES.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CitySelector;