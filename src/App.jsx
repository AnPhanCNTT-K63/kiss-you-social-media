import React from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import { UserProvider } from "./UserContext";
import Navbar from "./components/navbar/Navbar";
import Navigation from "./components/navigation/Navigation";

function App() {
  return (
    <div>
      <Router>
        <UserProvider>
          <AppContent />
        </UserProvider>
      </Router>
    </div>
  );
}

function AppContent() {
  const location = useLocation();
  const hideNavbarRoutes = ["/signin", "/signup"];

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Navigation />
    </>
  );
}

export default App;
