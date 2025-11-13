// src/components/sections/Navbar/NavbarLinks.jsx
import React from 'react';
 import './Navbar.css'; 

const links = [
    { name: 'Accueil', href: '#home' },
    { name: 'Dashboard', href: '#dash' },
    { name: 'Carte Interactive', href: '#carte' },
    { name: 'Conseils écologiques', href: '#advice' },
];

const NavbarLinks = ({ isMobile = false }) => {
    const listClass = isMobile ? "nav-links-list-mobile" : "nav-links-list-desktop";
    const linkClass = isMobile ? "nav-link-mobile" : "nav-link-desktop";

    return (
        <ul className={listClass}>
            {links.map((link) => (
                <li key={link.name}>
                    <a href={link.href} className={linkClass}>
                        {link.name}
                    </a>
                </li>
            ))}
        </ul>
    );
}

export default NavbarLinks;

