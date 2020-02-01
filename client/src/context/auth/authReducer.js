import { LOGIN, GET_USER, LOGOUT } from "../types";

export default (state, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true
      };
    case GET_USER:
      return {
        ...state,
        isAuthenticated: true,
        username: action.payload
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        username: ""
      };
    default:
      return {
        state
      };
  }
};
