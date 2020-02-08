import { GET_ENTRIES, GET_SINGLE_ENTRY } from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_ENTRIES:
      return {
        ...state,
        entries: action.payload.data,
        pagination: action.payload.pagination
      };
    case GET_SINGLE_ENTRY:
      return {
        ...state,
        single: action.payload.data
      };
    default:
      return {
        state
      };
  }
};
