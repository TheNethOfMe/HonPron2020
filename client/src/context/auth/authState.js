import React, { useReducer } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import { LOGOUT, AUTH_LOADING, SET_USER, SET_ERROR } from "../types";

const AuthState = props => {
  const initialState = {
    loading: true,
    user: null,
    isAuthenticated: false,
    error: ""
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Set Loading
  const setLoading = isLoading => {
    dispatch({
      type: AUTH_LOADING,
      payload: isLoading
    });
  };

  // Set Error
  const setError = msg => {
    setLoading(false);
    dispatch({
      type: SET_ERROR,
      payload: msg
    });
    setTimeout(() => {
      dispatch({
        type: SET_ERROR,
        payload: ""
      });
    }, 5000);
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
      setError(`ERROR: ${err.response.data.error}`);
    }
  };

  // Register User
  const registerUser = async (username, email, password) => {
    setLoading(true);
    const config = {
      headers: { "Content-Type": "application/json" }
    };
    try {
      const res = await axios.post(
        "/api/v1/auth/register",
        { name: username, email, password },
        config
      );
      Cookies.set("hpAuth", res.data.token, { expires: 2, path: "/" });
      setUser(jwtDecode(res.data.token));
    } catch (err) {
      setError(`ERROR: ${err.response.data.error}`);
    }
  };

  // Update User Details
  const updateUserDetails = async fields => {
    setLoading(true);
    try {
      const res = await axios.put("/api/v1/auth/updatedetails", fields);
      setUser(res.data.data);
    } catch (err) {
      setError(`ERROR: ${err.response.data.error}`);
    }
  };

  // Update Password
  const updatePassword = async fields => {
    setLoading(true);
    try {
      await axios.put("/api/v1/auth/updatepassword", fields);
      setLoading(false);
    } catch (err) {
      setError(`ERROR: ${err.response.data.error}`);
    }
  };

  // Get User
  const getUser = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/v1/auth/me");
      setUser(res.data.data);
    } catch (err) {
      setError(`ERROR: ${err.response.data.error}`);
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
      setError(`ERROR: ${err.response.data.error}`);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        loading: state.loading,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        error: state.error,
        setLoading,
        setError,
        loginUser,
        registerUser,
        updateUserDetails,
        updatePassword,
        getUser,
        logoutUser
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
