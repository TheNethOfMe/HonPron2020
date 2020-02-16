import React, { useReducer } from "react";
import axios from "axios";
import stringifyQueryParams from "../../utils/stringifyQueryParams";
import SeriesContext from "./seriesContext";
import seriesReducer from "./seriesReducer";
import { GET_ONE_SERIES, GET_ALL_SERIES, CREATE_SERIES } from "../types";

const SeriesState = props => {
  const initialState = {
    allSeries: [],
    seriesPage: {},
    singleSeries: {},
    seriesEntries: [],
    entriesPage: {}
  };

  const [state, dispatch] = useReducer(seriesReducer, initialState);

  // Get all series
  const getAllSeries = async params => {
    let endpoint = "/api/v1/series";
    if (Object.keys(params).length) {
      const queryParams = stringifyQueryParams(params, "?");
      endpoint += queryParams;
    }
    try {
      const res = await axios.get(endpoint);
      dispatch({
        type: GET_ALL_SERIES,
        payload: res.data
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getOneSeries = async (slug, params) => {
    let endpoint = `/api/v1/series/${slug}`;
    if (Object.keys(params).length) {
      const queryParams = stringifyQueryParams(params, "?");
      endpoint += queryParams;
    }
    try {
      const res = await axios.get(endpoint);
      dispatch({
        type: GET_ONE_SERIES,
        payload: res.data
      });
    } catch (err) {
      console.log(err);
    }
  };

  const createSeries = async newSeries => {
    let formData = new FormData();
    formData.append("seriesName", newSeries.seriesName);
    formData.append("seriesType", newSeries.seriesType);
    formData.append("seriesDesc", newSeries.seriesDesc);
    formData.append("imageAlt", newSeries.imageAlt);
    formData.append("file", newSeries.image);
    try {
      axios.post("/api/v1/series", formData, {
        headers: { "Context-Type": "multipart/form-data" }
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SeriesContext.Provider
      value={{
        allSeries: state.allSeries,
        seriesPage: state.seriesPage,
        singleSeries: state.singleSeries,
        seriesEntries: state.seriesEntries,
        entriesPage: state.entriesPage,
        getAllSeries,
        getOneSeries,
        createSeries
      }}
    >
      {props.children}
    </SeriesContext.Provider>
  );
};

export default SeriesState;
