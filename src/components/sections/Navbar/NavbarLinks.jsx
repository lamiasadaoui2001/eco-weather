// src/components/sections/Navbar/NavbarLinks.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const links = [
  { name: "Accueil", href: "/" },
  { name: "Dashboard", href: "/dash" },
  { name: "Conseils écologiques", href: "/advice" },
];

const NavbarLinks = ({ isMobile = false }) => {
  const listClass = isMobile
    ? "nav-links-list-mobile"
    : "nav-links-list-desktop";
  const linkClass = isMobile ? "nav-link-mobile" : "nav-link-desktop";

  return (
    <ul className={listClass}>
      {links.map((link) => (
        <li key={link.name}>
          <Link to={link.href} className={linkClass}>
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavbarLinks;
