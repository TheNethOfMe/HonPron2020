import React, { useContext, useEffect, useState, Fragment } from "react";

import SeriesContext from "../../context/series/seriesContext";
import SeriesListItem from "../entry-list/SeriesListItem";
import EntryList from "../entry-list/EntryList";
import Pagination from "../entry-list/parts/Pagination";

const SingleSeries = () => {
  const seriesContext = useContext(SeriesContext);
  const {
    singleSeries,
    seriesEntries,
    entriesPage,
    getOneSeries
  } = seriesContext;
  const [page, setPage] = useState(1);
  useEffect(() => {
    const slug = window.location.pathname.split("/")[2];
    getOneSeries(slug, { page });
    // eslint-disable-next-line
  }, [page]);
  return (
    <Fragment>
      <SeriesListItem singleSeries={singleSeries} />
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
