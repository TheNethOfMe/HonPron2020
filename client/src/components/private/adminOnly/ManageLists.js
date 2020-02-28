import React, { useContext, useEffect } from "react";

import GameListContext from "../../../context/gamelist/gamelistContext";
import ManageResourceCard from "./ManageResourceCard";

const ManageLists = () => {
  const gamelistContext = useContext(GameListContext);
  const { getAllLists, allLists } = gamelistContext;
  useEffect(() => {
    getAllLists();
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, []);
  // const onDelete = id => {
  //   deleteSeries(id);
  // };
  return (
    <div className="admin-manage">
      <h2>Manage Game Lists</h2>
      {allLists.map(list => (
        <ManageResourceCard
          key={list._id}
          title={`${list.title}${list.current ? " *" : ""}`}
          type="podcast"
          linkTo={`/edit-list/${list._id}`}
        />
      ))}
    </div>
  );
};

export default ManageLists;
// handleDelete={() => onDelete(list._id)}
