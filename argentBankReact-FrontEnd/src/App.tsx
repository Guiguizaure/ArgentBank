// import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/header";
import Footer from "./components/Footer/footer";
import Homepage from "./pages/Homepage/homepage";
import LoginPage from "./pages/LoginPage/loginPage";
import UserPage from "./pages/UserPage/userPage";
import "./scss/base/_reset.scss";

function App() {
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
