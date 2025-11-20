import React from "react";
import { NavLink } from "react-router-dom";
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
          <NavLink
            to={link.href}
            className={({ isActive }) =>
              isActive ? `${linkClass} active` : linkClass
            }
          >
            {link.name}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default NavbarLinks;
