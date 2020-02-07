import React, { useContext, useEffect, useState, Fragment } from "react";

import SeriesContext from "../../context/series/seriesContext";
import SeriesListItem from "../entry-list/SeriesListItem";
import EntryList from "../entry-list/EntryList";
import Pagination from "../entry-list/parts/Pagination";

const SingleSeries = ({ match }) => {
  const seriesContext = useContext(SeriesContext);
  const {
    singleSeries,
    seriesEntries,
    entriesPage,
    getOneSeries
  } = seriesContext;
  const [page, setPage] = useState(1);
  useEffect(() => {
    const slug = match.params.name;
    getOneSeries(slug, { page });
    // eslint-disable-next-line
  }, [page]);
  return (
    <Fragment>
      <div className="entry-list-item">
        <SeriesListItem singleSeries={singleSeries} />
      </div>
      <EntryList entries={seriesEntries} />
      {!!Object.keys(entriesPage).length && (
        <Pagination
          page={page}
          pagination={entriesPage}
          handlePagination={setPage}
        />
      )}
    </Fragment>
  );
};

export default SingleSeries;
/*
 */
