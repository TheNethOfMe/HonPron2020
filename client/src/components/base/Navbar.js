import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Navbar = ({ user, handleLogout, error }) => {
  return (
    <Fragment>
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
      {!!error && <p className="error-text">{error}</p>}
    </Fragment>
  );
};

Navbar.propTypes = {
  user: PropTypes.object,
  handleLogout: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default Navbar;
