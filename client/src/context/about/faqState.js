import React, { useReducer } from "react";
import axios from "axios";
import FaqContext from "./faqContext";
import faqReducer from "./faqReducer";
import { GET_FAQS, GET_SINGLE_FAQ, DELETE_FAQ } from "../types";

const FaqState = props => {
  const initialState = {
    faqs: [],
    singleFaq: {}
  };

  const [state, dispatch] = useReducer(faqReducer, initialState);

  // Get faqs
  const getFaqs = async () => {
    try {
      const res = await axios.get("/api/v1/faqs?sort=order");
      dispatch({
        type: GET_FAQS,
        payload: res.data.data
      });
    } catch (err) {
      console.log(err);
    }
  };

  // Get single faq
  const getOneFaq = async id => {
    try {
      const res = await axios.get(`/api/v1/faqs/${id}`);
      console.log(res.data);
      dispatch({
        type: GET_SINGLE_FAQ,
        payload: res.data
      });
    } catch (err) {
      console.log(err);
    }
  };

  // Create a faq
  const createFaq = async newFaq => {
    try {
      await axios.post("/api/v1/faqs", newFaq);
    } catch (err) {
      console.log(err);
    }
  };

  // Update a faq
  const updateFaq = async (id, updatedFields) => {
    try {
      await axios.put(`/api/v1/faqs/${id}`, updatedFields);
    } catch (err) {
      console.log(err);
    }
  };

  // Delete a faq
  const deleteFaq = async id => {
    try {
      await axios.delete(`/api/v1/faqs/${id}`);
      dispatch({
        type: DELETE_FAQ,
        payload: id
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <FaqContext.Provider
      value={{
        faqs: state.faqs,
        singleFaq: state.singleFaq,
        getFaqs,
        getOneFaq,
        createFaq,
        updateFaq,
        deleteFaq
      }}
    >
      {props.children}
    </FaqContext.Provider>
  );
};

export default FaqState;
