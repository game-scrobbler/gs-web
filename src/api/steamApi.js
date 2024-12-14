import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";

export const GetSteamAchievement = async (appid) => {
  const { user, ApiUrl } = useContext(UserContext);
  try {
    const achievementResponse = await axios.get(
      ApiUrl + "/api/app-achievement",
      {
        params: { steamid: user.id, appid: appid },
      }
    );

    // Process response if the game has achievements
    const achievements = achievementResponse.data || [];
    const achievementsCompleted = achievements.filter(
      (ach) => ach.achieved
    ).length;
    const totalAchievements = achievements.length;

    return { achievementsCompleted, totalAchievements };
  } catch (err) {
    // Check if the error is due to a lack of achievements (400 status)
    if (err.response && err.response.status === 400) {
      console.warn(`Game ${appid} has no achievements.`);
      return { achievementsCompleted: 0, totalAchievements: 0 };
    }

    // Handle other errors
    console.error(
      `Error fetching achievements for appid ${appid}:`,
      err.message
    );
    return { achievementsCompleted: 0, totalAchievements: 0 };
  }
};

export const GetSteamLibrary = async (user) => {
  const { ApiUrl } = useContext(UserContext);
  try {
    const steamId = user.id; // Replace with the user's Steam ID
    const response = await axios.get(ApiUrl + "/api/owned-games", {
      params: { steamId },
    });

    let games = response.data.games;
    let tempOwnedGames = [];

    games.map(async (game) => {
      tempOwnedGames.push({
        title: game.name,
        platform: "Steam",
        hoursPlayed: Math.round((game.playtime_forever * 10) / 60) / 10,
        achievementsCompleted: 0,
        totalAchievements: 0,
        appid: game.appid,
      });
    });
    console.log(tempOwnedGames);

    return tempOwnedGames || [];
  } catch (err) {
    console.error("Error fetching owned games:", err);
  }
};