import { GET_CURRENT_LIST, GET_ALL_LISTS } from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_CURRENT_LIST:
      return {
        ...state,
        gamelist: action.payload
      };
    case GET_ALL_LISTS:
      return {
        ...state,
        allLists: action.payload
      };
    default:
      return {
        state
      };
  }
};
