import React, { useContext, Fragment } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../../context/auth/authContext";

const Dashboard = () => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  return (
    <div className="dashboard">
      {user.status && user.status === "admin" ? (
        <Fragment>
          <h2>Hello, Admin {user.name}</h2>
          <Link to="/manage-series" className="dashboard_btn admin-dash">
            Manage Series
          </Link>
          <Link to="/manage-entries" className="dashboard_btn admin-dash">
            Manage Entries
          </Link>
          <Link to="/manage-lists" className="dashboard_btn admin-dash">
            Manage Game Lists
          </Link>
          <Link to="/manage-tickets" className="dashboard_btn admin-dash">
            Manage User Messages
          </Link>
          <Link to="/manage-menu" className="dashboard_btn admin-dash">
            Manage Menu
          </Link>
          <Link to="/manage-users" className="dashboard_btn admin-dash">
            Manage Users
          </Link>
          <Link to="/moderate-comments" className="dashboard_btn admin-dash">
            Moderate Comments
          </Link>
          <Link to="/manage-faqs" className="dashboard_btn admin-dash">
            Manage Faqs
          </Link>
        </Fragment>
      ) : (
        <h2>Hello, {user.name}</h2>
      )}
      <Fragment>
        {" "}
        <Link to="/update-profile" className="dashboard_btn user-dash">
          Update Profile
        </Link>
      </Fragment>
    </div>
  );
};

export default Dashboard;
