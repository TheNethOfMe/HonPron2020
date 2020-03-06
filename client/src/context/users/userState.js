import React, { useReducer, useContext } from "react";
import axios from "axios";
import stringifyQueryParams from "../../utils/stringifyQueryParams";
import UserContext from "./userContext";
import userReducer from "./userReducer";
import AuthContext from "../auth/authContext";
import { GET_ALL_USERS, UPDATE_USER_STATUS, DELETE_USER } from "../types";

const UserState = props => {
  const authContext = useContext(AuthContext);
  const { setError } = authContext;
  const initialState = {
    users: [],
    pagination: {}
  };

  const [state, dispatch] = useReducer(userReducer, initialState);

  // Get All Users
  const getUsers = async params => {
    let endpoint = "/api/v1/users";
    if (Object.keys(params).length) {
      const queryParams = stringifyQueryParams(params, "?");
      endpoint += queryParams;
    }
    try {
      const res = await axios.get(endpoint);
      dispatch({
        type: GET_ALL_USERS,
        payload: res.data
      });
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  // Update User Status
  const updateUserStatus = async (id, status) => {
    try {
      const res = await axios.put(`/api/v1/users/${id}`, status);
      dispatch({
        type: UPDATE_USER_STATUS,
        payload: res.data.data
      });
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  // Delete Menu Item
  const deleteUser = async id => {
    try {
      await axios.delete(`/api/v1/users/${id}`);
      dispatch({
        type: DELETE_USER,
        payload: id
      });
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        users: state.users,
        pagination: state.pagination,
        getUsers,
        updateUserStatus,
        deleteUser
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
