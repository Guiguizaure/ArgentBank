import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/argentBankLogo.png";
import "./header.scss";

const Header: React.FC = () => {
  return (
    <nav className="main-nav">
      <Link to="/" className="main-nav-logo">
        <img src={Logo} alt="Argent Bank Logo" />
        {/* <h1 className="sr-only">Argent Bank</h1> */}
      </Link>
      <div>
        <Link to="/sign-in" className="main-nav-item">
          <i className="fa fa-user-circle"></i> Sign In
        </Link>
      </div>
    </nav>
  );
};

export default Header;
