import React, { useContext } from "react";
import "./header.css";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { Svg } from "../../components";
import { SVG_path } from "../../assets";

export const Header = () => {
  const { steamUser } = useContext(UserContext);

  return (
    <header className="header">
      <div className="logo">
        <Svg
          SVG={SVG_path.logo_black}
          style={{ width: "80", height: "80"}}
          alt="Logo"
        />
        <NavLink to="/" className="navLink">
          Game Scrobbler
        </NavLink>
      </div>
      <nav className="navigation">
        <ul>
          {/* <li>
            <a href="#features">Features</a>
          </li>
          <li>
            <a href="#how-it-works">How It Works</a>
          </li>
          <li>
            <a href="#contact">Contact Us</a>
          </li> */}
          <li>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </li>
          <li>
            {steamUser ? (
              <NavLink to="/Log-In">
                <img
                  className="userLogo"
                  src={steamUser.photos[2].value}
                  alt="user Img"
                ></img>
              </NavLink>
            ) : (
              <NavLink to="/Log-In">
                <button className="login-button">Get Started</button>
              </NavLink>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};
