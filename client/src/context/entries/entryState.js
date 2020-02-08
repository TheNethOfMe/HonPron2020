import React, { useReducer } from "react";
import axios from "axios";
import stringifyQueryParams from "../../utils/stringifyQueryParams";
import EntryContext from "./entryContext";
import entryReducer from "./entryReducer";
import { GET_ENTRIES, GET_SINGLE_ENTRY } from "../types";

const EntryState = props => {
  const initialState = {
    entries: [],
    single: {},
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

  // Get One Entry
  const getOneEntry = async id => {
    try {
      const res = await axios.get(`/api/v1/entries/${id}`);
      dispatch({
        type: GET_SINGLE_ENTRY,
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
        single: state.single,
        pagination: state.pagination,
        getEntries,
        getOneEntry
      }}
    >
      {props.children}
    </EntryContext.Provider>
  );
};

export default EntryState;
