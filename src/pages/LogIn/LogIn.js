import React from "react";
import "./LogIn.css"; // Assuming you'll add your styles here

// LoginPage component for rendering the login page
export const LoginPage = () => {

  const handleSteamLogin = () => {
    // Redirect the user to the backend Steam authentication route
    window.location.href = "https://game-trace-be.onrender.com/auth/steam";
  };

  return (
    <div className="login-page">
      <header className="login-header">
        <h1>Welcome to GameTracker</h1>
        <p>
          Log in to track your game progress and achievements across platforms.
        </p>
      </header>

      <div className="login-container">
        <input type="email" placeholder="Email" className="login-input" />
        <input type="password" placeholder="Password" className="login-input" />
        <button className="login-button google">Log in with Google</button>
        <button className="login-button steam" onClick={handleSteamLogin}>
          Log in with Steam
        </button>
        <button className="login-button xbox">Log in with Xbox</button>
      </div>
    </div>
  );
};
