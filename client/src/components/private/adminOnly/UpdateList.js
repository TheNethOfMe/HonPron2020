import React, { useContext, useState, useEffect } from "react";

// Context
import GameListContext from "../../../context/gamelist/gamelistContext";
// Form Parts
import TextEntry from "../../form-parts/TextEntry";
import TextArea from "../../form-parts/TextArea";

const UpdateList = ({ match }) => {
  const gameListContext = useContext(GameListContext);
  const {
    unformatted,
    getUnformattedList,
    updateList,
    createNewList
  } = gameListContext;
  const [gameListData, setField] = useState({
    title: "",
    list: "",
    current: true
  });

  useEffect(() => {
    getUnformattedList(match.params.id);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!!unformatted.title) {
      setField({
        _id: unformatted._id,
        title: unformatted.title,
        list: unformatted.list,
        current: unformatted.current
      });
    }
    // eslint-disable-next-line
  }, [unformatted]);

  const { title, list } = gameListData;

  const onChange = e => {
    setField({ ...gameListData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    console.log("Submit");
    updateList(gameListData);
  };

  const submitNew = e => {
    e.preventDefault();
    console.log("New List!");
    createNewList(gameListData);
  };

  return (
    <div className="hp-form">
      <div className="hp-form_container">
        <h2>Update List</h2>
        <form onSubmit={onSubmit}>
          <TextEntry
            name="title"
            placeholder="List Title"
            value={title}
            label="List Title"
            onChange={onChange}
          />
          <TextArea
            name="list"
            placeholder="Current List"
            value={list}
            label="Current List"
            onChange={onChange}
            info="Separate games with new line and end game title with at symbol and episode number"
            rows={50}
          />
          <input className="hp-form_btn" type="submit" value="Submit" />
        </form>
        <button className="hp-btn newlist-btn" onClick={submitNew}>
          Create New Current List
        </button>
      </div>
    </div>
  );
};

export default UpdateList;
