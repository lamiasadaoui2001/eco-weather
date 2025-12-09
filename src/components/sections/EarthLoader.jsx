// src/components/sections/EarthLoader.jsx
import React from 'react';
import './EarthLoader.css';

// Importe l'image locale depuis src/assets/
import earthImage from '../../assets/earth.png';

const EarthLoader = () => {
  return (
    <div className="earth-loader-container">
      {/*  Injecte l'image via style */}
      <div
        className="earth-loader"
        style={{ backgroundImage: `url(${earthImage})` }}
      ></div>
      <div className="loading-text">Chargement...</div>
    </div>
  );
};

export default EarthLoader;