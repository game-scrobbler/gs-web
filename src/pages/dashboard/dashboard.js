import React, { useEffect, useState, useContext } from "react";
import { json, useLocation } from "react-router-dom";
import "./dashboard.css"; // Assuming you'll add your styles here
import { UserContext } from "../../context/UserContext";
import axios from "axios";

export const Dashboard = () => {
  // const [user, setUser] = useState(null);
  const { user, setUser } = useContext(UserContext);
  const [ownedGames, setOwnedGames] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation();
  const [sortedData, setSortedData] = useState(ownedGames);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // Sorting function
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sortedArray = [...sortedData].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "asc" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    setSortedData(sortedArray);
    setSortConfig({ key, direction });
  };

  // const fetchAchievements = async (appid, steamid) => {
  //   try {
  //     const achievementResponse = await axios.get(
  //       "http://localhost:5000/api/app-achievement",
  //       {
  //         params: { steamid: steamid, appid: appid },
  //       }
  //     );

  //     const achievements = achievementResponse.data || [];
  //     const achievementsCompleted = achievements.filter(
  //       (ach) => ach.achieved
  //     ).length;
  //     const totalAchievements = achievements.length;

  //     return { achievementsCompleted, totalAchievements };
  //   } catch (err) {
  //     // console.error(`Error fetching achievements for appid ${appid}:`, err);
  //     return { achievementsCompleted: 0, totalAchievements: 0 };
  //   }
  // };

  const fetchAchievements = async (appid) => {
    try {
      const achievementResponse = await axios.get(
        "https://game-trace-be.onrender.com/api/app-achievement",
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

  const fetchOwnedGames = async (userData) => {
    try {
      const steamid = userData.id; // Replace with the user's Steam ID
      const response = await axios.get(
        "https://game-trace-be.onrender.com/api/owned-games",
        {
          params: { steamid },
        }
      );

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

      setOwnedGames(tempOwnedGames || []); // Set the games data
      setSortedData(tempOwnedGames || []); // Set the games data
    } catch (err) {
      console.error("Error fetching owned games:", err);
      setError("Failed to load owned games.");
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "https://game-trace-be.onrender.com:5000/auth/steam/user",
          {
            withCredentials: true, // Ensures cookies are sent with the request
          }
        );
        console.log("User data:", response.data.user);
        let userRes = response.data.user;
        sessionStorage.setItem("user", JSON.stringify(userRes));
        setUser(userRes); // Decode and parse the user data
        fetchOwnedGames(userRes);
        fetchAllAchievements();
        return response.data.user; // Save user data in your app's state
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };
    // Parse user data from the query parameter
    // const query = new URLSearchParams(location.search);
    // const userData = query.get("user");
    fetchUser();
    const sessionUser = JSON.parse(sessionStorage.getItem("user"));
    if (sessionUser) {
      setUser(sessionUser); // Decode and parse the user data
      fetchOwnedGames(sessionUser);
      fetchAllAchievements();
    }
    // else if (userData) {
    //   sessionStorage.setItem("user", decodeURIComponent(userRes));
    //   setUser(JSON.parse(decodeURIComponent(userRes))); // Decode and parse the user data
    //   fetchOwnedGames(JSON.parse(decodeURIComponent(userRes)));
    //   fetchAllAchievements();
    //   window.history.replaceState(null, "", window.location.pathname);
    // }
  }, [location]);

  const fetchAllAchievements = async () => {
    const batchSize = 50;

    for (let i = 0; i < sortedData.length; i += batchSize) {
      const batch = sortedData.slice(i, i + batchSize);

      try {
        const updatedBatch = await Promise.all(
          batch.map(async (game) => {
            const { achievementsCompleted, totalAchievements } =
              await fetchAchievements(game.appid);
            return {
              ...game,
              achievementsCompleted,
              totalAchievements,
            };
          })
        );

        // Update the state incrementally with the new data
        setSortedData((prevData) => {
          const updatedData = [...prevData];
          for (let j = 0; j < updatedBatch.length; j++) {
            updatedData[i + j] = updatedBatch[j];
          }
          return updatedData;
        });
      } catch (err) {
        console.error("Error fetching achievements for batch:", err.message);
        setError("Failed to load some achievements.");
      }
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Your Game Library</h1>
        <p>
          Track your gaming journey, view playtime, and achievements across
          platforms.
        </p>
      </header>

      <section className="statistics">
        <h2>Overall Stats</h2>
        <div className="stats-container">
          <div className="stat-item">
            <h3>Total Games</h3>
            <p>{sortedData.length}</p>
          </div>
          <div className="stat-item">
            <h3>Total Hours Played</h3>
            <p>
              {sortedData.reduce(
                (total, game) => total + Math.round(game.hoursPlayed),
                0
              )}{" "}
              hrs
            </p>
          </div>
          <div className="stat-item">
            <h3>Total Achievements</h3>
            <p>
              {sortedData.reduce(
                (total, game) => total + game.achievementsCompleted,
                0
              )}{" "}
              /
              {sortedData.reduce(
                (total, game) => total + game.totalAchievements,
                0
              )}
            </p>
          </div>
        </div>
      </section>

      <div className="game-table-container">
        {sortedData.length > 0 ? (
          <table className="game-table">
            <thead>
              <tr>
                <th onClick={() => handleSort("title")}>Game Title</th>
                <th onClick={() => handleSort("platform")}>Platform</th>
                <th onClick={() => handleSort("hoursPlayed")}>
                  Combined Hours Played
                </th>
                <th onClick={() => handleSort("achievementsCompleted")}>
                  Achievements Completed
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((game, index) => (
                <tr key={index}>
                  <td>{game.title}</td>
                  <td>{game.platform}</td>
                  <td>{game.hoursPlayed} hrs</td>
                  <td>
                    {game.achievementsCompleted}/{game.totalAchievements}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-games">
            No games in your library. Start adding games to track your progress!
          </p>
        )}
      </div>
    </div>
  );
};
