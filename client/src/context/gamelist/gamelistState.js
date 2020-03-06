import React, { useReducer, useContext } from "react";
import axios from "axios";
import GamelistContext from "./gamelistContext";
import gamelistReducer from "./gamelistReducer";
import AuthContext from "../auth/authContext";
import {
  GET_CURRENT_LIST,
  GET_ALL_LISTS,
  GET_UNFORMATTED_LIST
} from "../types";

const GamelistState = props => {
  const authContext = useContext(AuthContext);
  const { setError } = authContext;
  const initialState = {
    gamelist: [],
    allLists: [],
    unformatted: {}
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
      setError(err.response.data.error);
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
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  // Get unformatted list
  const getUnformattedList = async id => {
    try {
      const res = await axios.get(`/api/v1/gamelist/${id}`);
      dispatch({
        type: GET_UNFORMATTED_LIST,
        payload: res.data.data
      });
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  // Update list
  const updateList = async listData => {
    try {
      await axios.put(`/api/v1/gamelist/${listData._id}`, listData, {
        headers: { "Context-Type": "multipart/form-data" }
      });
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  // Create new current list and remove current from previous list
  const createNewList = async listData => {
    console.log("Fire Two");
    const newData = {
      title: listData.title,
      list: listData.list,
      current: true
    };
    try {
      await axios.put(
        `/api/v1/gamelist/${listData._id}`,
        { current: false },
        {
          headers: { "Context-Type": "multipart/form-data" }
        }
      );
      await axios.post(`/api/v1/gamelist`, newData);
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  return (
    <GamelistContext.Provider
      value={{
        gamelist: state.gamelist,
        allLists: state.allLists,
        unformatted: state.unformatted,
        getCurrentList,
        getAllLists,
        getUnformattedList,
        updateList,
        createNewList
      }}
    >
      {props.children}
    </GamelistContext.Provider>
  );
};

export default GamelistState;
