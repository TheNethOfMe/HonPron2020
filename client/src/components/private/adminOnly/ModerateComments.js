import React, { useContext, useEffect, useState } from "react";

import CommentContext from "../../../context/comments/commentContext";
import AdminTabs from "./AdminTabs";
import ManageCommentCard from "./ManageCommentCard";
import Pagination from "../../entries/entry-parts/Pagination";

const ModerateComments = () => {
  const commentContext = useContext(CommentContext);
  const { comments, pagination, getComments } = commentContext;
  const [page, setPage] = useState(1);
  const [tab, tabSelect] = useState("pending");

  useEffect(() => {
    let params = {};
    params.isApproved = false;
    params.colorCode = "blue";
    switch (tab) {
      case "approved":
        params.isApproved = true;
        delete params.colorCode;
        break;
      case "red":
        params.isApproved = false;
        params.colorCode = "red";
        break;
      case "yellow":
        params.isApproved = false;
        params.colorCode = "yellow";
        break;
      case "black":
        params.isApproved = false;
        params.colorCode = "black";
        break;
      default:
        params.isApproved = false;
        params.colorCode = "blue";
        break;
    }
    getComments({ ...params, page });
    // eslint-disable-next-line
  }, [tab]);
  return (
    <div className="admin-manage">
      <h2>Moderate Comments</h2>
      <AdminTabs
        tab={tab}
        tabSelect={tabSelect}
        tabList={["pending", "approved", "yellow", "red", "black"]}
      />
      {!!comments.length &&
        comments.map(comment => (
          <ManageCommentCard key={comment._id} comment={comment} />
        ))}
      {!!Object.keys(pagination).length && (
        <Pagination
          page={page}
          pagination={pagination}
          handlePagination={setPage}
        />
      )}
    </div>
  );
};

export default ModerateComments;
