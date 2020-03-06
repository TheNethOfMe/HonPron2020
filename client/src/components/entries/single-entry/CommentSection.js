import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import AuthContext from "../../../context/auth/authContext";
import CommentContext from "../../../context/comments/commentContext";
import TextArea from "../../form-parts/TextArea";

const CommentSection = ({ comments, entryId, seriesId }) => {
  const commentContext = useContext(CommentContext);
  const { createComment } = commentContext;
  const authContext = useContext(AuthContext);
  const { isAuthenticated } = authContext;
  const [commentText, updateText] = useState("");
  const onSubmit = e => {
    e.preventDefault();
    const commentData = {
      text: commentText,
      series: seriesId
    };
    createComment(entryId, commentData);
  };
  return (
    <div className="comment-section">
      <h3>Comments</h3>
      {isAuthenticated ? (
        <form onSubmit={onSubmit}>
          <h4>Leave a Comment</h4>
          <h5>
            Please note that all comments must be approved by mods before they
            will be seen here. Thanks for your understanding.
          </h5>
          <TextArea
            name="comment"
            placeholder="Write your comment here"
            value={commentText}
            label="Write your comment here"
            onChange={e => updateText(e.target.value)}
            rows={3}
          />
          <button className="hp-btn hp-form_btn">Create Comment</button>
        </form>
      ) : (
        <div>You must be logged in to leave a comment</div>
      )}
      {comments.length ? (
        comments.map(comment => (
          <div key={comment.id} className="comment-section_single">
            <h3>{comment.user} says:</h3>
            <p>{comment.text}</p>
          </div>
        ))
      ) : (
        <div>No Comments to Display</div>
      )}
    </div>
  );
};

CommentSection.propTypes = {
  comments: PropTypes.array.isRequired,
  entryId: PropTypes.string.isRequired,
  seriesId: PropTypes.string.isRequired
};

export default CommentSection;
