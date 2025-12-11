import React, { useState } from 'react';
import NavbarBtn from './NavbarBtn';
import NavbarLogo from './NavbarLogo';
import NavbarLinks from './NavbarLinks';
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai"; 
import './Navbar.css';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(prev => !prev);
    };

    const closeMenu = () => setMenuOpen(false);

    return (
        <>
            {/* OVERLAY FLOU */}
            <div
                className={`nav-overlay ${menuOpen ? "is-visible" : ""}`}
                onClick={closeMenu}
            ></div>

            <nav className="nav-container">
                
                {/* Barre principale */}
                <div className="nav-main">
                    <NavbarLogo />

                    {/* Liens desktop */}
                    <div className="nav-links-desktop"> 
                        <NavbarLinks />
                    </div>

                    <NavbarBtn />
                </div>

                {/* Bouton hamburger */}
                <div className="menu-btn-container" onClick={toggleMenu}>
                    <button className='menu-toggle-btn'>
                        {menuOpen ? <AiOutlineClose /> : <GiHamburgerMenu />} 
                    </button>
                </div>

                {/* Menu mobile */}
                <div className={`nav-menu-mobile ${menuOpen ? 'is-open' : ''}`}>
                    <NavbarLinks isMobile={true} closeMenu={closeMenu} />
                </div>
            </nav>
        </>
    );
}

export default Navbar;
