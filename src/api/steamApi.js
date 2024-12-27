import axios from "axios";

export const HandleSteamLogin = (ApiUrl) => {
  // Redirect the user to the backend Steam authentication route
  window.location.href = ApiUrl + "/auth/steam";
};

// export const TestSteamHistory = async (ApiUrl) => {
//   // Redirect the user to the backend Steam authentication route
//   try {
//     await axios
//       .get(ApiUrl + "/api/getSteamReport", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ appid: "YOUR_APP_ID", time: Date.now() / 1000 }),
//       })
//       .then((response) => response.json())
//       .then((data) => console.log(data))
//       .catch((error) => console.error(error));

//     // Process response if the game has achievements
//   } catch (err) {
//     console.log(err);

//     // Check if the error is due to a lack of achievements (400 status)
//   }
// };

export const GetSteamAchievement = async (appid, user, ApiUrl) => {
  try {
    const achievementResponse = await axios.get(
      ApiUrl + "/api/router-achievement",
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

export const GetSteamLibrary = async (user, ApiUrl) => {
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

export const GetSteamAppInfo = async (ApiUrl, appid) => {
  if (!ApiUrl || !appid) {
    console.error("ApiUrl and App ID are required");
    return null;
  }

  try {
    // Make a GET request to your backend API
    const response = await axios.get(`${ApiUrl}/api/getGameTags`, {
      params: { appid: appid }, // Add the appid as query parameter
    });

    if (response.status !== 200) {
      console.error(`Failed to fetch game info. Status: ${response.status}`);
      return null;
    }
    console.log(response.data.data);

    const data = await response.data.data;
    return data;
  } catch (error) {
    // console.error("Error fetching Steam app info:", error);
    return null;
  }
};
