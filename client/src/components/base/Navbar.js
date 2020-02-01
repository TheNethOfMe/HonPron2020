import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../../context/auth/authContext";

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, username, getUser, logoutUser } = authContext;
  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, [isAuthenticated]);
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="navbar_left">Honest Piranha</div>
        <div className="navbar_right">
          <ul>
            <li>
              {isAuthenticated ? (
                <Link to="/">[{username}]</Link>
              ) : (
                <Link to="/login">Login</Link>
              )}
            </li>
            <li>
              {isAuthenticated ? (
                <a href="@" onClick={logoutUser}>
                  Logout
                </a>
              ) : (
                <Link to="/">Register</Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
