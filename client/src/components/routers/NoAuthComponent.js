import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import AuthContext from "../../context/auth/authContext";

const NoAuthComponent = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading } = authContext;
  return (
    <Route
      {...rest}
      render={props =>
        !isAuthenticated && !loading ? (
          <div className="main-container">
            <div className="main-container_list">
              <Component {...props} />
            </div>
          </div>
        ) : (
          <Redirect to="/" />
        )
      }
    ></Route>
  );
};

export default NoAuthComponent;
