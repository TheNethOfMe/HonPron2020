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

  // Create Series
  const createEntry = async newEntry => {
    let formData = new FormData();
    formData.append("title", newEntry.title);
    formData.append("entryType", newEntry.entryType);
    formData.append("description", newEntry.description);
    formData.append("games", newEntry.games);
    formData.append("series", newEntry.series);
    formData.append("imageAlt", newEntry.imageAlt);
    formData.append("file", newEntry.image);
    // podcast or video
    if (newEntry.urlId) formData.append("urlId", newEntry.urlId);
    if (newEntry.duration) formData.append("duration", newEntry.duration);
    // SNEScapades
    if (newEntry.episode) formData.append("episode", newEntry.episode);
    if (newEntry.gameList) formData.append("gameList", newEntry.gameList);
    // blog
    if (newEntry.blog) formData.append("blog", newEntry.blog);
    if (newEntry.author) formData.append("author", newEntry.author);
    try {
      axios.post("/api/v1/entries", formData, {
        headers: { "Context-Type": "multipart/form-data" }
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
        getOneEntry,
        createEntry
      }}
    >
      {props.children}
    </EntryContext.Provider>
  );
};

export default EntryState;
