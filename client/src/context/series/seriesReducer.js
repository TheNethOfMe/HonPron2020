import { GET_ONE_SERIES, GET_ALL_SERIES } from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_ALL_SERIES:
      return {
        ...state,
        allSeries: action.payload.data,
        seriesPage: action.payload.pagination
      };
    case GET_ONE_SERIES:
      return {
        ...state,
        singleSeries: action.payload.data,
        seriesEntries: action.payload.data.entries,
        entriesPage: action.payload.pagination
      };
    default:
      return {
        state
      };
  }
};
