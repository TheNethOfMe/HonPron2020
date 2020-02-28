import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import SeriesContext from "../../../context/series/seriesContext";
import ManageResourceCard from "./ManageResourceCard";
import Pagination from "../../entries/entry-parts/Pagination";

const ManageSeries = () => {
  const seriesContext = useContext(SeriesContext);
  const { allSeries, seriesPage, getAllSeries, deleteSeries } = seriesContext;
  const [page, setPage] = useState(1);
  useEffect(() => {
    getAllSeries({ page });
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, [page]);
  const onDelete = id => {
    deleteSeries(id);
  };
  return (
    <div className="admin-manage">
      <h2>Manage Series</h2>
      <Link to="/create-series" className="dashboard_btn">
        Create Series
      </Link>
      {allSeries.map(series => (
        <ManageResourceCard
          key={series._id}
          title={series.seriesName}
          type={series.seriesType}
          linkTo={`/edit-series/${series._id}`}
          handleDelete={() => onDelete(series._id)}
        />
      ))}
      {!!Object.keys(seriesPage) && (
        <Pagination
          page={page}
          pagination={seriesPage}
          handlePagination={setPage}
        />
      )}
    </div>
  );
};

export default ManageSeries;
