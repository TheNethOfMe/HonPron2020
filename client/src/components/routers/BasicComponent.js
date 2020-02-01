import React from "react";
import { Route } from "react-router-dom";

const BasicComponent = ({
  component: Component,
  context: Context,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props => (
        <Context>
          <Component {...props} />
        </Context>
      )}
    ></Route>
  );
};

export default BasicComponent;
