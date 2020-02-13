import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import AuthContext from "../../context/auth/authContext";

const PrivateComponent = ({
  component: Component,
  context: Context,
  ...rest
}) => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  return (
    <Route
      {...rest}
      render={props =>
        !!user && user.status === "admin" ? (
          <Context>
            <div className="main-container">
              <div className="main-container_list">
                <Component {...props} />
              </div>
            </div>
          </Context>
        ) : (
          <Redirect to="/" />
        )
      }
    ></Route>
  );
};

export default PrivateComponent;
