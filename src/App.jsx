import Navbar from "./components/navbar/Navbar";
import Navigation from "./components/navigation/Navigation";
import { BrowserRouter as Router } from "react-router-dom";
import { UserProvider } from "./UserContext";

function App() {
  return (
    <div>
      <Router>
        <UserProvider>
          <Navbar />
          <Navigation />
        </UserProvider>
      </Router>
    </div>
  );
}

export default App;
