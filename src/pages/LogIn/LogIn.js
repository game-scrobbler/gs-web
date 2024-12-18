import React, { useContext } from "react";
import "./LogIn.css"; // Assuming you'll add your styles here
import { HandleSteamLogin, HandleLogout, HandleEpicLogin } from "../../api";
import { UserContext } from "../../context/UserContext";

// LoginPage component for rendering the login page
export const LoginPage = () => {
  const { user, setSteamUser, setEpicUser, steamUser, epicUser, ApiUrl } =
    useContext(UserContext);
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

        {user?.platform === "google" ? (
          <button className="login-button google disabled">
            Already Logged in with Google
          </button>
        ) : (
          <button className="login-button google">Log in with Google</button>
        )}

        {steamUser ? (
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

        {steamUser ? (
          <button
            className="logout-button"
            onClick={() => HandleLogout(setSteamUser, setEpicUser, ApiUrl)}
          >
            Log Out
          </button>
        ) : null}
      </div>
    </div>
  );
};
