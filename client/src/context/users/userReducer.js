import { GET_ALL_USERS, UPDATE_USER_STATUS, DELETE_USER } from "../types";

export default (state, action) => {
  console.log(action.payload);
  switch (action.type) {
    case GET_ALL_USERS:
      return {
        ...state,
        users: action.payload.data,
        pagination: action.payload.pagination
      };
    case UPDATE_USER_STATUS:
      return {
        ...state,
        users: state.users.map(user =>
          user._id === action.payload._id ? action.payload : user
        )
      };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter(user => user._id !== action.payload)
      };
    default:
      return {
        ...state
      };
  }
};
