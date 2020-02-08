import { GET_CURRENT_LIST } from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_CURRENT_LIST:
      return {
        ...state,
        gamelist: action.payload
      };
    default:
      return {
        state
      };
  }
};
