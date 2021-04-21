import React from "react";
import "../css/Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Header = ({ toggleSideBar }) => {
  return (
    <nav className="navbar navbar-expand-md navbar-light nav-bg fixed-top">
      <Link to="/" className="navbar-brand">
        Conseil du Marché Financier
      </Link>
      <button className="btn toggle-btn" onClick={toggleSideBar}>
        <FontAwesomeIcon icon="bars" />
      </button>
    </nav>
  );
};

export default Header;
