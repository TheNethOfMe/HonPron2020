import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Navbar = ({ user, handleLogout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="navbar_left">
          <Link to="/" className="navbar_left-brand">
            Honest Piranha
          </Link>
        </div>
        <div className="navbar_right">
          <ul>
            <li>
              {!!user ? (
                <Link to="/dashboard">[{user.name}]</Link>
              ) : (
                <Link to="/login">Login</Link>
              )}
            </li>
            <li>
              {!!user ? (
                <button className="nav-btn" onClick={handleLogout}>
                  Logout
                </button>
              ) : (
                <Link to="/register">Register</Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  user: PropTypes.object,
  handleLogout: PropTypes.func.isRequired
};

export default Navbar;
