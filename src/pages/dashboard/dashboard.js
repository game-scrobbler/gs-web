import React, { useEffect, useState, useContext, useCallback } from "react";
import { useLocation } from "react-router-dom";
import "./dashboard.css"; // Assuming you'll add your styles here
import { UserContext } from "../../context/UserContext";
import {
  GetSteamAchievement,
  GetSteamLibrary,
  FetchSteamUser,
  GetSteamAppInfo,
} from "../../api";
import {
  GameTable,
  GamingJourneyTimeline,
  GamingPersonaWheel,
  GenreHeatMap,
  GenreSkillMap,
  SkillProgressTree,
} from "../../components";
import { GoalPredictions } from "../../components/GamePredictions/GoalPredictions";
// import GamingPersonaWheel from "./components/GamingPersonaWheel";
// import GamingJourneyTimeline from "./components/GamingJourneyTimeline";
// import GenreSkillMap from "./components/GenreSkillMap";

const heatmapData = [
  [1, 2, 3, 4, 5],
  [5, 4, 3, 2, 1],
  [2, 3, 4, 5, 1],
  [3, 4, 5, 1, 2],
  [4, 5, 1, 2, 3],
];

export const Dashboard = () => {
  const { ApiUrl, steamUser, setSteamUser } = useContext(UserContext);
  const [setError] = useState(null);
  const location = useLocation();
  const [allGames, setAllGames] = useState([]);
  const [sortedData, setSortedData] = useState(allGames);
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

  const fetchAllSteamAchievements = async () => {
    const batchSize = 15;
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    for (let i = 0; i < allGames.length; i += batchSize) {
      const batch = allGames.slice(i, i + batchSize);

      try {
        await delay(6000);
        const updatedBatch = await Promise.all(
          batch.map(async (game) => {
            const { achievementsCompleted, totalAchievements } =
              await GetSteamAchievement(game.appid, steamUser, ApiUrl);
            // const appInfo = await GetSteamAppInfo(ApiUrl, game.appid);

            return {
              ...game,
              achievementsCompleted,
              totalAchievements,
              // appInfo: appInfo || {},
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

  useEffect(() => {
    try {
      FetchSteamUser(setSteamUser, ApiUrl).then((userRes) => {
        if (userRes) {
          GetSteamLibrary(userRes, ApiUrl).then((ownedGames) => {
            setAllGames(ownedGames); // Set the games data
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
    const sessionSteamUser = JSON.parse(sessionStorage.getItem("steamUser"));
    if (sessionSteamUser) {
      setSteamUser(sessionSteamUser); // Decode and parse the user data
      GetSteamLibrary(sessionSteamUser, ApiUrl).then((ownedGames) => {
        setAllGames(ownedGames); // Set the games data
      });
    }
  }, [location]);

  useEffect(() => {
    setSortedData(allGames);
    fetchAllSteamAchievements();
    // if (allGames.length > 0) {
    //   GetSteamAppInfo(ApiUrl, allGames[0].appid);
    // }
  }, [allGames]);

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
            <p>{allGames.length}</p>
          </div>
          <div className="stat-item">
            <h3>Total Hours Played</h3>
            <p>
              {allGames.reduce(
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
      <div className="dashboard-charts-container">
        <GamingJourneyTimeline />
        <div className="dashboard-charts-container-2">
          <div className="flex space-between gap-40">
            <GamingPersonaWheel />
            <GenreSkillMap />
          </div>
          <SkillProgressTree />
          <GoalPredictions />
          <GenreHeatMap
            title="Dynamic Data Heatmap"
            colorRange={["#ff0000", "#ffff00", "#00ff00"]}
          />
        </div>
      </div>
      {/* <div className="game-table-container">
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
      </div> */}
      {allGames.length > 0 ? (
        <GameTable allGames={allGames} />
      ) : (
        <div>games list updating</div>
      )}
    </div>
  );
};
