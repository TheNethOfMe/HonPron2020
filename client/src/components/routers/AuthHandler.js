import React, { Fragment, useContext, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Cookies from "js-cookie";

import Navbar from "../base/Navbar";
import AuthContext from "../../context/auth/authContext";
import MainRouter from "./MainRouter";
import Loading from "../base/Loading";

const AuthHandler = () => {
  const authContext = useContext(AuthContext);
  const {
    isAuthenticated,
    user,
    error,
    getUser,
    logoutUser,
    loading,
    setLoading
  } = authContext;
  useEffect(() => {
    if (!!Cookies.get("hpAuth") && !user) {
      getUser();
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line
  }, [isAuthenticated]);
  return (
    <Router>
      <Fragment>
        <Navbar user={user} handleLogout={logoutUser} error={error} />
        <div className="site-container">
          {loading ? <Loading /> : <MainRouter />}
        </div>
      </Fragment>
    </Router>
  );
};

export default AuthHandler;
