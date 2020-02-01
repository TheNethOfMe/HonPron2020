import React, { useReducer } from "react";
import axios from "axios";
import FaqContext from "./faqContext";
import faqReducer from "./faqReducer";
import { GET_FAQS } from "../types";

const FaqState = props => {
  const initialState = {
    faqs: []
  };

  const [state, dispatch] = useReducer(faqReducer, initialState);

  // Get faqs
  const getFaqs = async () => {
    try {
      const res = await axios.get("/api/v1/faqs");
      dispatch({
        type: GET_FAQS,
        payload: res.data.data
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <FaqContext.Provider value={{ faqs: state.faqs, getFaqs }}>
      {props.children}
    </FaqContext.Provider>
  );
};

export default FaqState;
