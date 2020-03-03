import React, { useReducer } from "react";
import axios from "axios";
import stringifyQueryParams from "../../utils/stringifyQueryParams";
import CommentContext from "./commentContext";
import commentReducer from "./commentReducer";
import { GET_ALL_COMMENTS, DELETE_COMMENT } from "../types";

const CommentState = props => {
  const initialState = {
    comments: [],
    pagination: {}
  };

  const [state, dispatch] = useReducer(commentReducer, initialState);

  // get comments
  const getComments = async params => {
    let endpoint = "/api/v1/comments/admin";
    if (Object.keys(params).length) {
      const queryParams = stringifyQueryParams(params, "?");
      endpoint += queryParams;
    }
    try {
      const res = await axios.get(endpoint);
      dispatch({
        type: GET_ALL_COMMENTS,
        payload: res.data
      });
    } catch (err) {
      console.log(err);
    }
  };

  const createComment = async (entryId, commentData) => {
    try {
      await axios.post(`/api/v1/entries/${entryId}/comment`, commentData);
    } catch (err) {
      console.log(err);
    }
  };

  const approveComment = async id => {
    try {
      await axios.put(`/api/v1/comments/${id}`, {
        isApproved: true
      });
      dispatch({
        type: DELETE_COMMENT,
        payload: id
      });
    } catch (err) {
      console.log(err);
    }
  };

  const deleteComment = async id => {
    try {
      await axios.delete(`/api/v1/comments/${id}`);
      dispatch({
        type: DELETE_COMMENT,
        payload: id
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <CommentContext.Provider
      value={{
        comments: state.comments,
        pagination: state.pagination,
        getComments,
        createComment,
        approveComment,
        deleteComment
      }}
    >
      {props.children}
    </CommentContext.Provider>
  );
};

export default CommentState;
