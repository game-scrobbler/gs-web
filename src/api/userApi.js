import axios from "axios";

export const FetchSteamUser = async (setUser, ApiUrl) => {
  try {
    const response = await axios.get(ApiUrl + "/auth/steam/user", {
      withCredentials: true, // Ensures cookies are sent with the request
    });
    let userRes;
    userRes = response.data.user;
    console.log("User data:", userRes);
    sessionStorage.setItem("steamUser", JSON.stringify(userRes));
    setUser(userRes); // Decode and parse the user data
    // fetchOwnedGames(userRes);
    // fetchAllAchievements();
    return userRes; // Save user data in your app's state
  } catch (error) {
    console.error("Error fetching user data:", error.message);
  }
};

export const FetchEpicUser = async (accessToken, ApiUrl) => {
  try {
    const response = await axios.get(ApiUrl + "/epic/userInfo", {
      params: { accessToken: accessToken },
    });
    let userRes;
    console.log(response.data);

    // userRes = response.data.user;
    // console.log("User data:", userRes);
    // sessionStorage.setItem("steamUser", JSON.stringify(userRes));
    // setUser(userRes); // Decode and parse the user data
    // // fetchOwnedGames(userRes);
    // // fetchAllAchievements();
    // return userRes; // Save user data in your app's state
  } catch (error) {
    console.error("Error fetching user data:", error.message);
  }
};

export const HandleLogout = async (setSteamUser, setEpicUser, ApiUrl) => {
  try {
    const response = await axios.get(ApiUrl + "/logout", {
      withCredentials: true, // Include cookies for session management
    });
    console.log(response.data.message); // Log the success message
    // Clear user data or redirect to the login page
    setSteamUser(null);
    setEpicUser(null);

    sessionStorage.removeItem("steamUser");
    sessionStorage.removeItem("epicUser");
    sessionStorage.removeItem("user");
  } catch (error) {
    console.error("Logout failed:", error);
  }
};
