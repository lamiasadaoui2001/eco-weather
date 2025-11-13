// src/components/sections/Navbar/NavbarBtn.jsx
import React from 'react';
 import './Navbar.css'; 

const NavbarBtn = () => {
    return (
        // La classe 'sm:block' est gérée par défaut par le CSS en ne s'affichant pas
        <button className="nav-button"> 
            Commencer
        </button>
    );
}

export default NavbarBtn;
