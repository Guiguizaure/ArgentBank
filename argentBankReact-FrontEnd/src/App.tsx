// App.tsx

import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getToken } from "./utility/token"; // Adjust the path as necessary
// Import necessary actions
import Header from "./components/Header/header";
import Footer from "./components/Footer/footer";
import Homepage from "./pages/Homepage/homepage";
import LoginPage from "./pages/LoginPage/loginPage";
import UserPage from "./pages/UserPage/userPage";
import "./scss/base/_reset.scss";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = getToken();
    if (token) {
      // Dispatch an action to update your app state
      // For example, verify token validity or fetch user profile
    }
  }, [dispatch]);

  return (
    <Router>
      <section className="main-wrapper">
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/user" element={<UserPage />} />
        </Routes>
        <Footer />
      </section>
    </Router>
  );
}

export default App;
