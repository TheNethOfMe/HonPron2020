import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

// Context
import TicketContext from "../../../context/tickets/ticketContext";

const ViewComment = ({ match }) => {
  let history = useHistory();
  const ticketContext = useContext(TicketContext);
  const { singleTicket, getOneTicket, updateOneTicket } = ticketContext;
  const [ticketData, setField] = useState({
    subject: "",
    topic: "",
    text: "",
    colorCode: "",
    author: "Anon",
    date: "",
    closed: ""
  });

  useEffect(() => {
    if (match.params.id) {
      getOneTicket(match.params.id);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (match.params.id && !!singleTicket.subject) {
      let fillData = { ...singleTicket };
      delete fillData.__v;
      delete fillData.id;
      fillData.author = !!singleTicket.author ? singleTicket.author : "Anon";
      const jsDate = new Date(singleTicket.dateAdded);
      fillData.dateAdded = `${jsDate.getMonth() +
        1}/${jsDate.getDate()}/${jsDate.getFullYear()}`;
      setField({ ...fillData });
    }
    // eslint-disable-next-line
  }, [singleTicket]);

  const changeStatus = () => {
    const closed = !singleTicket.closed;
    updateOneTicket(singleTicket._id, { closed });
    history.push("/manage-tickets");
  };
  return (
    <div className="hp-form">
      <h2>{ticketData.subject}</h2>
      <h3>
        By {ticketData.author} on {ticketData.dateAdded}
      </h3>
      <h4>
        Status: {ticketData.colorCode} - {ticketData.closed ? "Closed" : "Open"}
      </h4>
      <p>{ticketData.text}</p>
      <button onClick={() => changeStatus()}>
        {ticketData.closed ? "Mark as Open" : "Mark as Closed"}
      </button>
    </div>
  );
};

export default ViewComment;
