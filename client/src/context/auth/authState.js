import React, { useReducer } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import { LOGOUT, AUTH_LOADING, SET_USER } from "../types";

const AuthState = props => {
  const initialState = {
    loading: true,
    user: null,
    isAuthenticated: false
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Set Loading
  const setLoading = isLoading => {
    dispatch({
      type: AUTH_LOADING,
      payload: isLoading
    });
  };

  // Set User
  const setUser = user => {
    dispatch({
      type: SET_USER,
      payload: user
    });
  };

  // Login User
  const loginUser = async (email, password) => {
    setLoading(true);
    const config = {
      headers: { "Content-Type": "application/json" }
    };
    try {
      const res = await axios.post(
        "/api/v1/auth/login",
        { email, password },
        config
      );
      Cookies.set("hpAuth", res.data.token, { expires: 2, path: "/" });
      setUser(jwtDecode(res.data.token));
    } catch (err) {
      console.log(err);
    }
  };

  // Get User
  const getUser = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/v1/auth/me");
      setUser(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Logout User
  const logoutUser = async () => {
    setLoading(true);
    try {
      await axios.get("/api/v1/auth/logout", {
        withCredentials: true
      });
      Cookies.remove("hpAuth", { path: "/" });
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
        loading: state.loading,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        setLoading,
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
