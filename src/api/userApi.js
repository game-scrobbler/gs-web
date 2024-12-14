import axios from "axios";

export const FetchUser = async (setUser, ApiUrl) => {
  try {
    const response = await axios.get(ApiUrl + "/auth/steam/user", {
      withCredentials: true, // Ensures cookies are sent with the request
    });
    console.log("User data:", response.data.user);
    let userRes = response.data.user;
    sessionStorage.setItem("user", JSON.stringify(userRes));
    setUser(userRes); // Decode and parse the user data
    // fetchOwnedGames(userRes);
    // fetchAllAchievements();
    return response.data.user; // Save user data in your app's state
  } catch (error) {
    console.error("Error fetching user data:", error.message);
  }
};

export const HandleLogout = async (setUser, ApiUrl) => {
  try {
    const response = await axios.get(ApiUrl + "/logout", {
      withCredentials: true, // Include cookies for session management
    });
    console.log(response.data.message); // Log the success message
    // Clear user data or redirect to the login page
    setUser(null);
    sessionStorage.removeItem("user");
  } catch (error) {
    console.error("Logout failed:", error);
  }
};
