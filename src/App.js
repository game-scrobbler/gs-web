import "./App.css";
import { LandingPage, Dashboard, LoginPage } from "./pages";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components";
import { UserProvider } from "./context/UserContext"; // Import the provider

function App() {
  return (
    <UserProvider>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Log-In" element={<LoginPage />} />
        {/* Catch-all route for undefined paths */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </UserProvider>
  );
}

export default App;
