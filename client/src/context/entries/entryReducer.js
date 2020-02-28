import { GET_ENTRIES, GET_SINGLE_ENTRY, DELETE_ENTRY } from "../types";

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
    case DELETE_ENTRY:
      return {
        ...state,
        entries: state.entries.filter(entry => entry._id !== action.payload)
      };
    default:
      return {
        state
      };
  }
};
