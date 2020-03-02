import React, { useContext, useEffect, useState, Fragment } from "react";
import PropTypes from "prop-types";
import queryStrToObject from "../../utils/queryStrToObject";
import EntryContext from "../../context/entries/entryContext";
import EntryList from "../entries/EntryList";
import Pagination from "../entries/entry-parts/Pagination";

const Entries = ({ match, location }) => {
  const entryContext = useContext(EntryContext);
  const { entries, pagination, getEntries } = entryContext;
  const [page, setPage] = useState(1);
  useEffect(() => {
    let query = { page };
    if (match.params.type) {
      query.entryType = match.params.type;
    }
    query = queryStrToObject(location.search, query);
    getEntries(query);
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, [page, match.params.type]);
  return (
    <Fragment>
      <EntryList entries={entries} />
      {!!Object.keys(pagination) && (
        <Pagination
          page={page}
          pagination={pagination}
          handlePagination={setPage}
        />
      )}
    </Fragment>
  );
};

Entries.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export default Entries;
