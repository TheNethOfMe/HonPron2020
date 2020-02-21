import React, { useReducer } from "react";
import axios from "axios";
import GamelistContext from "./gamelistContext";
import gamelistReducer from "./gamelistReducer";
import { GET_CURRENT_LIST, GET_ALL_LISTS } from "../types";

const GamelistState = props => {
  const initialState = {
    gamelist: [],
    allLists: []
  };

  const [state, dispatch] = useReducer(gamelistReducer, initialState);

  // Get current list
  const getCurrentList = async () => {
    try {
      const res = await axios.get("/api/v1/gamelist/current");
      dispatch({
        type: GET_CURRENT_LIST,
        payload: res.data.data
      });
    } catch (err) {
      console.log(err);
    }
  };

  // Get all lists
  const getAllLists = async () => {
    try {
      const res = await axios.get("/api/v1/gamelist");
      dispatch({
        type: GET_ALL_LISTS,
        payload: res.data.data
      });
    } catch (err) {}
  };

  return (
    <GamelistContext.Provider
      value={{
        gamelist: state.gamelist,
        allLists: state.allLists,
        getCurrentList,
        getAllLists
      }}
    >
      {props.children}
    </GamelistContext.Provider>
  );
};

export default GamelistState;
