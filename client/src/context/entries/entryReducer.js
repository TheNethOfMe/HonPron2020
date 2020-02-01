import { GET_ENTRIES } from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_ENTRIES:
      return {
        ...state,
        entries: action.payload.data,
        pagination: action.payload.pagination
      };
    default:
      return {
        state
      };
  }
};
