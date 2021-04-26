import React from "react";
import "../css/Header.css";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";
import { Link } from "react-router-dom";

const Header = ({ toggleSideBar, open }) => {
  return (
    <nav className="navbar navbar-expand-md navbar-light nav-bg fixed-top">
      <Link to="/" className="navbar-brand">
        Conseil du Marché Financier
      </Link>
      <IconButton
        aria-label="open drawer"
        color="inherit"
        onClick={toggleSideBar}>
        {open ? <MenuOpenIcon /> : <MenuIcon />}
      </IconButton>
    </nav>
  );
};

export default Header;
