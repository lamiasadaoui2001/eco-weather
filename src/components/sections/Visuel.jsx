// BrestVisuel.js
import React from 'react';
import './Conseils.css'; // Créez ce fichier CSS
import brest from "../../assets/Gemini_Generated_Brest.png";

const Visuel = () => {
  return (
    <div className="brest-visuel-container">

      <h3 className="brest-title">Image de Brest génerer par l'IA</h3>
      <img src={brest} alt="Carte stylisée de Brest" className="brest-image" />
    </div>
  );
};

export default Visuel;