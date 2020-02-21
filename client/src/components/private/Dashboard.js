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
          <Link to="/create-series" className="dashboard_btn">
            Create Series
          </Link>
          <Link className="dashboard_btn">Manage Series</Link>
          <Link to="/create-entry" className="dashboard_btn">
            Create Entry
          </Link>
          <Link className="dashboard_btn">Manage Entries</Link>
        </Fragment>
      ) : (
        <Fragment>User Area</Fragment>
      )}
    </div>
  );
};

export default Dashboard;
