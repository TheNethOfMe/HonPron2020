import React, { useReducer } from "react";
import axios from "axios";
import stringifyQueryParams from "../../utils/stringifyQueryParams";
import EntryContext from "./entryContext";
import entryReducer from "./entryReducer";
import { GET_ENTRIES } from "../types";

const EntryState = props => {
  const initialState = {
    entries: [],
    pagination: {}
  };

  const [state, dispatch] = useReducer(entryReducer, initialState);

  // Get Entries
  const getEntries = async params => {
    let endpoint = "/api/v1/entries";
    if (Object.keys(params).length) {
      const queryParams = stringifyQueryParams(params, "?");
      endpoint += queryParams;
    }
    try {
      const res = await axios.get(endpoint);
      dispatch({
        type: GET_ENTRIES,
        payload: res.data
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <EntryContext.Provider
      value={{
        entries: state.entries,
        pagination: state.pagination,
        getEntries
      }}
    >
      {props.children}
    </EntryContext.Provider>
  );
};

export default EntryState;
