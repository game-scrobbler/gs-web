// server.js

const express = require("express");
const session = require("express-session");
const passport = require("passport");
const axios = require("axios");
const SteamStrategy = require("passport-steam").Strategy;
const cors = require("cors");

const app = express();

const STEAM_API_KEY = "4F6B5FEDF178FFBE46D9F3F8B793855E";

app.use(
  cors({
    origin: "http://localhost:3000", // React frontend URL
    credentials: true, // Allow cookies to be sent
  })
);
// Session middleware setup
app.use(
  session({
    secret: "your_secret_key", // Replace with a secure secret
    resave: false,
    saveUninitialized: true,
  })
);

// Initialize Passport and session
app.use(passport.initialize());
app.use(passport.session());

// Passport session setup
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// Configure the Steam strategy for Passport
passport.use(
  new SteamStrategy(
    {
      returnURL: "http://localhost:5000/auth/steam/return",
      realm: "http://localhost:5000/",
      apiKey: "4F6B5FEDF178FFBE46D9F3F8B793855E", // Replace with your Steam API key
    },
    (identifier, profile, done) => {
      process.nextTick(() => {
        profile.identifier = identifier;
        return done(null, profile);
      });
    }
  )
);

// Routes for authentication
app.get("/auth/steam", passport.authenticate("steam"));

app.get(
  "/auth/steam/return",
  passport.authenticate("steam", { failureRedirect: "/" }),
  (req, res) => {
    // Send the user profile as JSON
    res.redirect(
      `http://localhost:3000/dashboard?user=${encodeURIComponent(
        JSON.stringify(req.user)
      )}`
    );
  }
);

app.get("/logout", (req, res) => {
  // Use Passport's logout method to clear the session
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: "Logout failed" });
    }
    res.status(200).json({ message: "Successfully logged out" }); // Send a success response
  });
});

// Route to check if user is authenticated
app.get("/auth/status", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ authenticated: true, user: req.user });
  } else {
    res.json({ authenticated: false });
  }
});

app.get("/api/owned-games", async (req, res) => {
  const { steamid } = req.query; // Get Steam ID from the query parameter

  if (!steamid) {
    return res.status(400).json({ error: "Steam ID is required" });
  }

  try {
    // Make a request to the Steam API
    const response = await axios.get(
      "http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/",
      {
        params: {
          key: STEAM_API_KEY,
          steamid: steamid,
          format: "json",
          include_appinfo: true,
          include_played_free_games: true,
        },
      }
    );

    // Send back the owned games data
    res.json(response.data.response);
  } catch (error) {
    console.error("Error fetching owned games:", error.message);
    res.status(500).json({ error: "Failed to fetch owned games" });
  }
});

app.get("/api/app-achievement", async (req, res) => {
  const { steamid } = req.query; // Get Steam ID from the query parameter
  const { appid } = req.query; // Get Steam ID from the query parameter

  if (!steamid) {
    return res.status(400).json({ error: "Steam ID is required" });
  }

  if (!appid) {
    return res.status(400).json({ error: "App ID is required" });
  }

  try {
    // Make a request to the Steam API
    const response = await axios.get(
      "http://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/",
      {
        params: {
          key: STEAM_API_KEY,
          steamid: steamid,
          appid: appid,
        },
      }
    );

    // Send back the app achievement data

    res.json(response.data.playerstats.achievements);
  } catch (error) {
    // console.error("Error fetching app achievement:", error.message);
    res.json([]);
  }
});

// Start the server
app.listen(5000, () => {
  console.log("Server listening on port 5000");
});
