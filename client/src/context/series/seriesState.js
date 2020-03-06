import React, { useReducer, useContext } from "react";
import axios from "axios";
import stringifyQueryParams from "../../utils/stringifyQueryParams";
import SeriesContext from "./seriesContext";
import seriesReducer from "./seriesReducer";
import AuthContext from "../auth/authContext";
import { GET_ONE_SERIES, GET_ALL_SERIES, DELETE_SERIES } from "../types";

const SeriesState = props => {
  const authContext = useContext(AuthContext);
  const { setError } = authContext;
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
      setError(err.response.data.error);
    }
  };

  // Get One Series
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
      setError(err.response.data.error);
    }
  };

  // Create a series
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
      setError(err.response.data.error);
    }
  };

  // Get Series for Update
  const getSeriesForUpdate = async id => {
    try {
      const res = await axios.get(`/api/v1/series/${id}/noentry`);
      dispatch({
        type: GET_ONE_SERIES,
        payload: res.data
      });
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  // Update Entry
  const updateSeries = async seriesData => {
    let formData = new FormData();
    for (const prop in seriesData) {
      formData.append(prop, seriesData[prop]);
    }
    try {
      axios.put(`/api/v1/series/${seriesData._id}`, formData, {
        headers: { "Context-Type": "multipart/form-data" }
      });
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  // Delete a series
  const deleteSeries = async id => {
    try {
      axios.delete(`api/v1/series/${id}`);
      dispatch({
        type: DELETE_SERIES,
        payload: id
      });
    } catch (err) {
      setError(err.response.data.error);
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
        createSeries,
        getSeriesForUpdate,
        updateSeries,
        deleteSeries
      }}
    >
      {props.children}
    </SeriesContext.Provider>
  );
};

export default SeriesState;
