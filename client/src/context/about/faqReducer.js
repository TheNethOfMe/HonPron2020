import { GET_FAQS, GET_SINGLE_FAQ, DELETE_FAQ, CREATE_FAQ } from "../types";

export default (state, action) => {
  console.log(action.payload);
  switch (action.type) {
    case GET_FAQS:
      return {
        ...state,
        faqs: action.payload
      };
    case GET_SINGLE_FAQ:
      return {
        ...state,
        singleFaq: action.payload.data
      };
    case CREATE_FAQ:
      return {
        ...state,
        faqs: [...state.faqs, action.payload.data]
      };
    case DELETE_FAQ:
      return {
        ...state,
        faqs: state.faqs.filter(faq => faq._id !== action.payload)
      };
    default:
      return {
        state
      };
  }
};
