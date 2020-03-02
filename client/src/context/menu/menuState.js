import React, { useReducer } from "react";
import axios from "axios";
import MenuContext from "./menuContext";
import menuReducer from "./menuReducer";
import {
  GET_MENU,
  ADD_MENU_ITEM,
  UPDATE_MENU_ITEM,
  DELETE_MENU_ITEM
} from "../types";

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

  // Create Menu Item
  const createMenuItem = async menuItemData => {
    try {
      const res = await axios.post("/api/v1/menu", menuItemData);
      dispatch({
        type: ADD_MENU_ITEM,
        payload: res.data
      });
    } catch (err) {
      console.log(err);
    }
  };

  // Update Menu Item
  const updateMenuItem = async (id, menuItemData) => {
    try {
      const res = await axios.put(`/api/v1/menu/${id}`, menuItemData);
      dispatch({
        type: UPDATE_MENU_ITEM,
        payload: res.data.data
      });
    } catch (err) {
      console.log(err);
    }
  };

  // Delete Menu Item
  const deleteMenuItem = async id => {
    try {
      await axios.delete(`/api/v1/menu/${id}`);
      dispatch({
        type: DELETE_MENU_ITEM,
        payload: id
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <MenuContext.Provider
      value={{
        menuItems: state.menuItems,
        getMenu,
        createMenuItem,
        updateMenuItem,
        deleteMenuItem
      }}
    >
      {props.children}
    </MenuContext.Provider>
  );
};

export default MenuState;
