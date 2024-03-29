import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import avatarIcon from "../assets/images/avatar-icon.png";

export default function Header() {
  const navigate = useNavigate();

  const activeStyle = {
    "font-weight": "bold",
    "text-decoration": "underline",
    color: "#161616",
  };

  function fakeLogOut() {
    localStorage.removeItem("loggedin");
    navigate("/");
    // window.location.reload();
  }

  return (
    <header>
      <Link className="site-logo" to="/">
        #VanLife
      </Link>
      <nav>
        <NavLink
          to="/host"
          className={({ isActive }) => (isActive ? "active-link" : null)}
        >
          Host
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? "active-link" : null)}
        >
          About
        </NavLink>
        <NavLink
          to="/vans"
          className={({ isActive }) => (isActive ? "active-link" : null)}
        >
          Vans
        </NavLink>

        <Link to="login" className="login-link">
          <img src={avatarIcon} className="login-icon" />
        </Link>
        <button onClick={fakeLogOut}>Logout</button>
      </nav>
    </header>
  );
}
