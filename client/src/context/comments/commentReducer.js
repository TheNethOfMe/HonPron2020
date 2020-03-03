import { GET_ALL_COMMENTS, DELETE_COMMENT } from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_ALL_COMMENTS:
      return {
        ...state,
        comments: action.payload.data
      };
    case DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(
          comment => comment._id !== action.payload
        )
      };
    default:
      return {
        ...state
      };
  }
};
