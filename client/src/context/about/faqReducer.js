import { GET_FAQS } from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_FAQS:
      return {
        ...state,
        faqs: action.payload
      };
    default:
      return {
        state
      };
  }
};
