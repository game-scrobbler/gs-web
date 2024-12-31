import React, { createContext, useState, useEffect } from "react";

// Create the context
export const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [steamUser, setSteamUser] = useState(null);
  const ApiUrl = 'https://api.gamescrobbler.com';

  useEffect(() => {
    const storedSteamUser = sessionStorage.getItem("steamUser");
    if (storedSteamUser) {
      setSteamUser(JSON.parse(storedSteamUser));
    }
    sessionStorage.setItem("steamUser", JSON.stringify(storedSteamUser));
  }, []);

  useEffect(() => {
    if (steamUser) {
      sessionStorage.setItem("steamUser", JSON.stringify(steamUser));
    } else {
      sessionStorage.removeItem("steamUser");
    }
  }, [steamUser]);

  return (
    <UserContext.Provider
      value={{
        ApiUrl,
        steamUser,
        setSteamUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
