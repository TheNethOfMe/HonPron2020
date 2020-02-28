import React, { useContext, Fragment } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../../context/auth/authContext";

const Dashboard = () => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  return (
    <div className="dashboard">
      <h2>Hello, {user.name}</h2>
      {user.status && user.status === "admin" ? (
        <Fragment>
          <h3>Series/Entry Management</h3>
          <Link to="/manage-series" className="dashboard_btn">
            Manage Series
          </Link>
          <Link to="/manage-entries" className="dashboard_btn">
            Manage Entries
          </Link>
          <Link to="/manage-lists" className="dashboard_btn">
            Manage Game Lists
          </Link>
        </Fragment>
      ) : (
        <Fragment>User Area</Fragment>
      )}
    </div>
  );
};

export default Dashboard;
