// src/components/sections/Navbar/NavbarBtn.jsx
import React from 'react';
 import './Navbar.css'; 

const NavbarBtn = () => {
    return (
        // La classe 'sm:block' est gérée par défaut par le CSS en ne s'affichant pas
        <button className="nav-button"> 
            Contactez-nous
        </button>
    );
}

export default NavbarBtn;
