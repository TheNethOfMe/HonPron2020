import React, { useContext, useState, Fragment } from "react";
import PropTypes from "prop-types";
import CommentContext from "../../../context/comments/commentContext";
const ManageCommentCard = ({ comment }) => {
  const commentContext = useContext(CommentContext);
  const { approveComment, deleteComment } = commentContext;
  const [isWarned, setWarning] = useState(false);
  const jsDate = new Date(comment.dateAdded);
  const displayDate = `${jsDate.getMonth() +
    1}/${jsDate.getDate()}/${jsDate.getFullYear()}`;
  return (
    <div className="admin-manage_card admin-manage_card-video">
      {!isWarned ? (
        <Fragment>
          <h3>{comment.text}</h3>
          <h4>
            User {comment.user.name} commented on entry {comment.entry.title}
          </h4>
          <p className="entry-list-item_date">{displayDate}</p>
          <div className="admin-manage_btn-dash">
            {!comment.isApproved && (
              <button
                onClick={() => approveComment(comment._id)}
                className="admin-manage_update-btn"
              >
                Approve
              </button>
            )}
            <button
              onClick={() => setWarning(true)}
              className="admin-manage_delete-btn"
            >
              Delete
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p className="admin-manage_warning-text">
            Are you absoultely sure you want to delete this comment? This action
            cannot be undone.
          </p>
          <div className="admin-manage_btn-dash">
            <button
              onClick={() => deleteComment(comment._id)}
              className="hp-btn admin-manage_delete-btn"
            >
              Delete
            </button>
            <button
              onClick={() => setWarning(!isWarned)}
              className="admin-manage_update-btn"
            >
              Cancel
            </button>
          </div>
        </Fragment>
      )}
    </div>
  );
};

ManageCommentCard.propTypes = {
  comment: PropTypes.object.isRequired
};

export default ManageCommentCard;
