import React, { useContext } from "react";
import "./header.css";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import axios from "axios";

export const Header = () => {
  const { user, setUser } = useContext(UserContext);
  //   console.log("header: " + user?.id);

  const handleLogout = async () => {
    try {
      const response = await axios.get("http://localhost:5000/logout", {
        withCredentials: true, // Include cookies for session management
      });
      console.log(response.data.message); // Log the success message
      // Clear user data or redirect to the login page
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  //   console.log("header: " + user);

  return (
    <header className="header">
      <div className="logo">
        <NavLink to="/" className="navLink">
          GameTracker
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
              <NavLink>
                <img className="userLogo" src={user.photos[2].value}></img>
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
