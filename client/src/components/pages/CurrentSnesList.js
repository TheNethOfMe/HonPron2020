import React, { useContext, useEffect } from "react";

import GamelistContext from "../../context/gamelist/gamelistContext";
import SnesList from "../entries/entry-parts/SnesList";

const CurrentSnesList = () => {
  const gamelistContext = useContext(GamelistContext);
  const { gamelist, getCurrentList } = gamelistContext;
  useEffect(() => {
    getCurrentList();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="current-rankings">
      <h2>Current SNEScapades Rankings</h2>
      <SnesList list={gamelist} />
    </div>
  );
};

export default CurrentSnesList;
