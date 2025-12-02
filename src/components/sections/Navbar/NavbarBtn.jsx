import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const NavbarBtn = () => {
  const navigate = useNavigate();

  return (
    <button className="nav-button" onClick={() => navigate("/contact")}>
      Contactez-nous
    </button>
  );
};

export default NavbarBtn;
