import React, { useContext } from "react";
import "./header.css";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { HandleLogout } from "../../api";

export const Header = () => {
  const { user, setUser, ApiUrl } = useContext(UserContext);

  return (
    <header className="header">
      <div className="logo">
        <NavLink to="/" className="navLink">
          Game Trace
        </NavLink>
      </div>
      <nav className="navigation">
        <ul>
          <li>
            <a href="#features">Features</a>
          </li>
          <li>
            <a href="#how-it-works">How It Works</a>
          </li>
          <li>
            <a href="#contact">Contact Us</a>
          </li>
          <li>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </li>
          <li>
            {user ? (
              <NavLink to="/" onClick={() => HandleLogout(setUser, ApiUrl)}>
                <img
                  className="userLogo"
                  src={user.photos[2].value}
                  alt="user Img"
                ></img>
              </NavLink>
            ) : (
              <NavLink to="/Log-In">
                <button className="login-button">Login</button>
              </NavLink>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};
