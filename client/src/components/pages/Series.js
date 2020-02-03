import React, { useContext, useEffect, useState, Fragment } from "react";

import SeriesContext from "../../context/series/seriesContext";
import SeriesList from "../entry-list/SeriesList";
import Pagination from "../entry-list/parts/Pagination";

const Series = () => {
  const seriesContext = useContext(SeriesContext);
  const { allSeries, seriesPage, getAllSeries } = seriesContext;
  const [page, setPage] = useState(1);
  useEffect(() => {
    getAllSeries({ page });
    // eslint-disable-next-line
  }, [page]);
  return (
    <Fragment>
      <SeriesList series={allSeries} />
      {!!Object.keys(seriesPage).length && (
        <Pagination
          page={page}
          pagination={seriesPage}
          handlePagination={setPage}
        />
      )}
    </Fragment>
  );
};

export default Series;
