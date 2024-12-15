import React, { useContext } from "react";
import "./LogIn.css"; // Assuming you'll add your styles here
import { HandleSteamLogin, HandleLogout } from "../../api";
import { UserContext } from "../../context/UserContext";

// LoginPage component for rendering the login page
export const LoginPage = () => {
  const { user, setUser, ApiUrl } = useContext(UserContext);
  console.log(user);

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

        {user?.platform === "google" ? (
          <button className="login-button google disabled">
            Already Logged in with Google
          </button>
        ) : (
          <button className="login-button google">Log in with Google</button>
        )}

        {user?.steam ? (
          <button className="login-button steam disabled">
            Already Logged in with Steam
          </button>
        ) : (
          <button
            className="login-button steam"
            onClick={() => HandleSteamLogin(ApiUrl)}
          >
            Log in with Steam
          </button>
        )}

        {user?.platform === "xbox" ? (
          <button className="login-button xbox disabled">
            Already Logged in with Xbox
          </button>
        ) : (
          <button className="login-button xbox">Log in with Xbox</button>
        )}

        {user?.platform === "epic" ? (
          <button className="login-button epic disabled">
            Already Logged in with Epic Games
          </button>
        ) : (
          <button className="login-button epic">Log in with Epic Games</button>
        )}

        {user ? (
          <button
            className="logout-button"
            onClick={() => HandleLogout(setUser, ApiUrl)}
          >
            Log Out
          </button>
        ) : null}
      </div>
    </div>
  );
};
