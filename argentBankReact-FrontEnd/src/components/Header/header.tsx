import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; // Import useSelector
import { signOut } from "../../features/user/userSlice";
import Logo from "../../assets/argentBankLogo.png";
import "./header.scss";
import { RootState } from "../../app/store";

const Header: React.FC = () => {
  const dispatch = useDispatch();
  // const location = useLocation();
  // Use useSelector to access the user information from the Redux state
  const user = useSelector((state: RootState) => state.user.user);
  const isAuthenticated = useSelector((state: RootState) => !!state.user.token);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    dispatch(signOut());
  };

  return (
    <nav className="main-nav">
      <Link to="/" className="main-nav-logo">
        <img src={Logo} alt="Argent Bank Logo" />
      </Link>
      <div className="nav">
        {/* Conditional rendering based on user's authentication status */}
        {isAuthenticated ? (
          <>
            <span className="main-nav-item">
              <FontAwesomeIcon icon={faCircleUser} />
              {user?.firstName}
            </span>
            <Link to="/" className="main-nav-item" onClick={handleSignOut}>
              <FontAwesomeIcon icon={faSignOut} />
              Sign Out
            </Link>
          </>
        ) : (
          <Link to="/login" className="main-nav-item">
            <FontAwesomeIcon icon={faCircleUser} />
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;
