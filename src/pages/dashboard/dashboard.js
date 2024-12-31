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
  GoalPredictions,
} from "../../components";

export const Dashboard = () => {
  const { ApiUrl, steamUser, setSteamUser } = useContext(UserContext);
  const [setError] = useState(null);
  const location = useLocation();
  const [allGames, setAllGames] = useState([]);
  const [sortedData, setSortedData] = useState(allGames);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

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
      <section className="statistics">
        <h2>Overall Stats</h2>
        <div className="stats-container">
          <div className="stat-item">
            <h2>Total Games</h2>
            <p>{allGames.length}</p>
            <div className="stat-progress">+3 this month</div>
          </div>
          <div className="stat-item">
            <h2>Total Hours Played</h2>
            <p>
              {allGames.reduce(
                (total, game) => total + Math.round(game.hoursPlayed),
                0
              )}{" "}
              hrs
            </p>
            <div className="stat-progress">+12.3 this week</div>
          </div>
          <div className="stat-item">
            <h2>Total Achievements</h2>
            <p>
              {sortedData.reduce(
                (total, game) => total + game.achievementsCompleted,
                0
              )}{" "}
              /{" "}
              {sortedData.reduce(
                (total, game) => total + game.totalAchievements,
                0
              )}
            </p>
            <div className="stat-progress">+3 this month</div>
          </div>
        </div>
      </section>
      <section className="game-table">
        {allGames.length > 0 ? (
          <>
            <div className="game-table-title">Game Table</div>
            <GameTable allGames={allGames} />
          </>
        ) : (
          <div>games list updating</div>
        )}
      </section>
      <section className="dash-charts">
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
      </section>
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
    </div>
  );
};
