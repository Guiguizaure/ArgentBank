import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Homepage from "./pages/Homepage/homepage";
import LoginPage from "./pages/LoginPage/loginPage";
import UserPage from "./pages/UserPage/userPage";
import "./scss/base/_reset.scss";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Dummy login function - replace with real authentication logic
  const login = (username: string, password: string) => {
    if (username === "correctUsername" && password === "correctPassword") {
      setIsLoggedIn(true);
    }
  };

  return (
    <Router>
      <section className="">
        {/* Navigation Links - You might want to move these inside your Header component */}

        <main className="">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<LoginPage onLogin={login} />} />
            <Route
              path="/user"
              element={isLoggedIn ? <UserPage /> : <Navigate to="/login" />}
            />
          </Routes>
        </main>
      </section>
    </Router>
  );
}

export default App;
