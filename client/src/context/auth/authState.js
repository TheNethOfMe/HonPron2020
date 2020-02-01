import React, { useReducer } from "react";
import axios from "axios";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import { LOGIN, GET_USER, LOGOUT } from "../types";

const AuthState = props => {
  const initialState = {
    username: "",
    isAuthenticated: false
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Login User
  const loginUser = async (email, password) => {
    const config = {
      headers: { "Content-Type": "application/json" }
    };
    try {
      const res = await axios.post(
        "/api/v1/auth/login",
        { email, password },
        config
      );
      dispatch({
        type: LOGIN,
        payload: res.data
      });
    } catch (err) {
      console.log(err);
    }
  };

  // Get User
  const getUser = async () => {
    try {
      const res = await axios.get("/api/v1/auth/me");
      dispatch({
        type: GET_USER,
        payload: res.data.data.name
      });
    } catch (err) {
      console.log(err);
    }
  };

  // Logout User
  const logoutUser = async () => {
    try {
      const res = await axios.get("/api/v1/auth/logout", {
        withCredentials: true
      });
      console.log(res);
      dispatch({
        type: LOGOUT
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        username: state.username,
        isAuthenticated: state.isAuthenticated,
        loginUser,
        getUser,
        logoutUser
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
