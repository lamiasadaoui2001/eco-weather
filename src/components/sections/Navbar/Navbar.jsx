
import React, { useState } from 'react';
import NavbarLinks from './NavbarLinks';
import NavbarBtn from './NavbarBtn';
import NavbarLogo from './NavbarLogo';
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai"; 
import './Navbar.css'; // <-- Importez le fichier CSS !

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className="nav-container">
            
            {/* Conteneur de la barre principale (Logo et Liens) */}
            <div className="nav-main">
                
                <NavbarLogo />
                
                {/* Liens de navigation pour desktop */}
                <div className="nav-links-desktop"> 
                    <NavbarLinks />
                </div>
                
                <NavbarBtn />
            </div>
            
            {/* Bouton Hamburger/Fermer pour mobile/tablette */}
            <div className="menu-btn-container" onClick={toggleMenu}>
                <button className='menu-toggle-btn'>
                    {menuOpen ? <AiOutlineClose /> : <GiHamburgerMenu />} 
                </button>
            </div>

            {/* Menu Déroulant Mobile/Tablet */}
            <div className={`nav-menu-mobile ${menuOpen ? 'is-open' : ''}`}>
                <NavbarLinks isMobile={true} />
            </div>
        </nav>
    );
}

export default Navbar;