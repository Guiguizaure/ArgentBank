// LoginPage.tsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../app/store";
import { loginUser } from "../../features/user/userSlice";
// import { fetchUserProfile } from "../../features/user/userSlice";
import { RootState } from "../../app/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import "./loginPage.scss";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const userStatus = useSelector((state: RootState) => state.user.status);
  const userError = useSelector((state: RootState) => state.user.error);

  useEffect(() => {
    if (userStatus === "succeeded") {
      navigate("/user");
    }
  }, [userStatus, navigate]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!email || !password) {
      // Update this to handle empty input fields
      console.error("Please enter both email and password");
      return;
    }
    dispatch(loginUser({ email, password }));
  };

  return (
    <main className="main login-page bg-dark">
      <section className="sign-in-content">
        <FontAwesomeIcon icon={faCircleUser} />
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button type="submit" className="sign-in-button">
            Sign In
          </button>
        </form>
        {/* Display error message if login failed */}
        {userStatus === "failed" && (
          <p className="error-message">{userError}</p>
        )}
      </section>
    </main>
  );
};

export default LoginPage;
