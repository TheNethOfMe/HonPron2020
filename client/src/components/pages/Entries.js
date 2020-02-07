import React, { useContext, useEffect, useState, Fragment } from "react";

import EntryContext from "../../context/entries/entryContext";
import EntryList from "../entry-list/EntryList";
import Pagination from "../entry-list/parts/Pagination";

const Entries = ({ match }) => {
  const entryContext = useContext(EntryContext);
  const { entries, pagination, getEntries } = entryContext;
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

export default Entries;
