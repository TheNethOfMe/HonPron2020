import { GET_MENU } from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_MENU:
      return {
        ...state,
        menuItems: action.payload
      };
    default:
      return {
        state
      };
  }
};
