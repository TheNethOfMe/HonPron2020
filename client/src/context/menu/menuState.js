import React, { useReducer } from "react";
import axios from "axios";
import MenuContext from "./menuContext";
import menuReducer from "./menuReducer";
import { GET_MENU } from "../types";

const MenuState = props => {
  const initialState = {
    menuItems: []
  };

  const [state, dispatch] = useReducer(menuReducer, initialState);

  // Get Menu
  const getMenu = async () => {
    try {
      const res = await axios.get("/api/v1/menu");
      dispatch({
        type: GET_MENU,
        payload: res.data.data
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <MenuContext.Provider value={{ menuItems: state.menuItems, getMenu }}>
      {props.children}
    </MenuContext.Provider>
  );
};

export default MenuState;
