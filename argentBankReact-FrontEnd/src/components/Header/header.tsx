import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom"; // Import useLocation
import { useDispatch } from "react-redux";
import { signOut } from "../../features/user/userSlice";
import Logo from "../../assets/argentBankLogo.png";
import "./header.scss";

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const isUserPage = location.pathname === "/user";

  const handleSignOut = () => {
    // Remove the token
    localStorage.removeItem("token");

    // Update Redux state
    dispatch(signOut());

    // Additional actions like redirecting to the home page can be handled here
  };

  return (
    <nav className="main-nav">
      <Link to="/" className="main-nav-logo">
        <img src={Logo} alt="Argent Bank Logo" />
      </Link>
      <div>
        {/* Always show the Sign In link unless it's the user page */}

        <Link to="/login" className="main-nav-item">
          <FontAwesomeIcon icon={faCircleUser} />
          Sign In
        </Link>

        {/* Only show the Sign Out link if it's the user page */}
        {isUserPage && (
          <Link to="/" className="main-nav-item" onClick={handleSignOut}>
            <FontAwesomeIcon icon={faSignOut} />
            Sign Out
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;
