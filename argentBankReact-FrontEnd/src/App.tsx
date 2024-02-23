// App.tsx

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getToken } from "./utility/token";
import { fetchUserProfile } from "./features/user/userSlice";
import { AppDispatch, RootState } from "./app/store";
import { setTokenInState } from "./features/user/userSlice";
import { useState } from "react";
// Import necessary actions
import Header from "./components/Header/header";
import Footer from "./components/Footer/footer";
import Homepage from "./pages/Homepage/homepage";
import LoginPage from "./pages/LoginPage/loginPage";
import UserPage from "./pages/UserPage/userPage";
import ProtectedRoute from "./components/ProtectedRoute/protectedRoute";
import "./scss/base/_reset.scss";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector((state: RootState) => !!state.user.token);
  const [authInitialized, setAuthInitialized] = useState(false);

  useEffect(() => {
    const storedToken = getToken();
    if (storedToken) {
      dispatch(setTokenInState(storedToken));
      dispatch(fetchUserProfile()).finally(() => {
        setAuthInitialized(true);
      });
    } else {
      setAuthInitialized(true);
    }
  }, [dispatch]);

  if (!authInitialized) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <section className="main-wrapper">
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/user"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                authenticationPath="/login"
              >
                <UserPage />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </section>
    </Router>
  );
}

export default App;
