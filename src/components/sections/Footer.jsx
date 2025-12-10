// src/components/sections/Footer.jsx
import React from 'react';
import './Footer.css';
import { FiMail, FiPhone, FiFacebook, FiInstagram, FiYoutube } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="footer">
      {/* NOUVEAU WRAPPER : Contient tout le contenu pour le centrer et appliquer le padding latéral */}
      <div className="footer-wrapper"> 
        
        <div className="footer-content">
          {/* Colonne gauche : Titre + Contact */}
          <div className="footer-column">
            <h2>Eco.<div className="logo-name">Weather</div> — Votre météo, plus claire, plus verte.</h2>
            <div className="contact-info">
              <h3>CONTACT INFORMATION</h3>
              <div className="contact-item">
                <FiMail size={16} />
                <span>support@teacircle.com</span>
              </div>
              <div className="contact-item">
                <FiPhone size={16} />
                <span>1800-3232-8686</span>
              </div>
            </div>
          </div>

          {/* Colonne centre : Company */}
          <div className="footer-column">
            <h3>COMPANY</h3>
            <ul>
              <li><a href="#features">Features</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="#pricing">Pricing</a></li>
            </ul>
          </div>

          {/* Colonne droite : Help */}
          <div className="footer-column">
            <h3>HELP</h3>
            <ul>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#help-center">Help Center</a></li>
              <li><a href="#support">Support</a></li>
            </ul>
          </div>

          {/* Colonne droite : Follow Us */}
          <div className="footer-column">
            <h3>FOLLOW US</h3>
            <div className="social-links">
              <a href="#" aria-label="Facebook">
                <FiFacebook size={24} />
              </a>
              <a href="#" aria-label="Instagram">
                <FiInstagram size={24} />
              </a>
              <a href="#" aria-label="YouTube">
                <FiYoutube size={24} />
              </a>
            </div>
          </div>
        </div>
        
        {/* Ligne de séparation */}
        <hr></hr>
        
        {/* Pied de page du bas (Copyright, Liens) */}
        <div className="footer-bottom">
          <p>© 2025 Eco.Weather. All Rights Reserved.</p>
          <div className="footer-links">
            <a href="#privacy">Privacy</a>
            <a href="#terms">Terms & condition</a>
          </div>
        </div>

      </div> {/* FIN DU WRAPPER */}
    </footer>
  );
};

export default Footer;