import { GET_ONE_SERIES, GET_ALL_SERIES, DELETE_SERIES } from "../types";

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
    case DELETE_SERIES:
      return {
        ...state,
        allSeries: state.allSeries.filter(
          series => series._id !== action.payload
        )
      };
    default:
      return {
        state
      };
  }
};
