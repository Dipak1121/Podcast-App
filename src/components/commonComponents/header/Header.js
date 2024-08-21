import React from "react";
import "./header.css";
import { NavLink, useLocation } from "react-router-dom";

const Header = () => {
  // const location = useLocation();
  // const currentPath = location.pathname;
  // console.log(currentPath);
  return (
    <div className="navbar">
      <div className="gradient"></div>
      <div className="links">
        <NavLink to="/">SignUp</NavLink>
        <NavLink to="/podcasts">Podcasts</NavLink>
        <NavLink to="/start-a-podcast">Start A Podcast</NavLink>
        <NavLink to="/profile">Profile</NavLink>
      </div>
    </div>
  );
};

export default Header;
