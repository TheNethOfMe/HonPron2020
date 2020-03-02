import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import EntryContext from "../../../context/entries/entryContext";
import ManageResourceCard from "./ManageResourceCard";
import Pagination from "../../entries/entry-parts/Pagination";

const ManageEntries = ({ match }) => {
  const entryContext = useContext(EntryContext);
  const { entries, pagination, getEntries, deleteEntry } = entryContext;
  const [page, setPage] = useState(1);
  useEffect(() => {
    let query = { page };
    if (match.params.type) {
      query.entryType = match.params.type;
    }
    getEntries(query);
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, [page]);
  const onDelete = id => {
    deleteEntry(id);
  };
  return (
    <div className="admin-manage">
      <h2>Manage Entries</h2>
      <Link to="/create-entry" className="dashboard_btn">
        Create Entry
      </Link>
      {entries.map(entry => (
        <ManageResourceCard
          key={entry._id}
          title={entry.title}
          type={entry.entryType}
          linkTo={`/edit-entry/${entry._id}`}
          handleDelete={() => onDelete(entry._id)}
        />
      ))}
      {!!Object.keys(pagination) && (
        <Pagination
          page={page}
          pagination={pagination}
          handlePagination={setPage}
        />
      )}
    </div>
  );
};

ManageEntries.propTypes = {
  match: PropTypes.object
};

export default ManageEntries;
