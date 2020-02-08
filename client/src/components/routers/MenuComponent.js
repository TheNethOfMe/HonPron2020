import React from "react";
import { Route } from "react-router-dom";

import MenuState from "../../context/menu/menuState";
import MainMenu from "../menu/MainMenu";

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
          <div className="main-container">
            <div className="main-container_list">
              <Component {...props} />
            </div>
            <div className="main-container_menu">
              <MenuState>
                <MainMenu />
              </MenuState>
            </div>
          </div>
        </Context>
      )}
    ></Route>
  );
};

export default BasicComponent;
