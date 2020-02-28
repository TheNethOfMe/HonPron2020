import React, { useContext, useEffect, useState } from "react";

import TicketContext from "../../../context/tickets/ticketContext";
import ManageResourceCard from "./ManageResourceCard";
import Pagination from "../../entries/entry-parts/Pagination";

const ManageTickets = () => {
  const ticketContext = useContext(TicketContext);
  const { tickets, pagination, getAllTickets, deleteTicket } = ticketContext;
  const [page, setPage] = useState(1);
  const [tab, tabSelect] = useState("open");
  useEffect(() => {
    let params = {};
    params.closed = false;
    switch (tab) {
      case "closed":
        params.closed = true;
        break;
      case "red":
        params.colorCode = "red";
        break;
      case "yellow":
        params.colorCode = "yellow";
        break;
      default:
        params.colorCode = "blue";
        break;
    }
    getAllTickets({ ...params, page });
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, [page, tab]);

  const onDelete = id => {
    deleteTicket(id);
  };
  return (
    <div className="admin-manage">
      <h2>Manage User Messages</h2>
      <div className="admin-tabs">
        <button
          onClick={() => tabSelect("open")}
          className={
            tab === "open" ? "admin-tab-btn selected" : "admin-tab-btn"
          }
        >
          Open
        </button>
        <button
          onClick={() => tabSelect("closed")}
          className={
            tab === "closed" ? "admin-tab-btn selected" : "admin-tab-btn"
          }
        >
          Closed
        </button>
        <button
          onClick={() => tabSelect("yellow")}
          className={
            tab === "yellow" ? "admin-tab-btn selected" : "admin-tab-btn"
          }
        >
          Yellow
        </button>
        <button
          onClick={() => tabSelect("red")}
          className={tab === "red" ? "admin-tab-btn selected" : "admin-tab-btn"}
        >
          Red
        </button>
      </div>
      {tickets.map(ticket => (
        <ManageResourceCard
          key={ticket._id}
          title={`${ticket.subject} [${ticket.topic}]`}
          type="podcast"
          linkTo={`/edit-ticket/${ticket._id}`}
          handleDelete={() => onDelete(ticket._id)}
        />
      ))}
      {!!Object.keys(pagination).length && (
        <Pagination
          page={page}
          pagination={pagination}
          handlePagination={setPage}
        />
      )}
    </div>
  );
};

export default ManageTickets;

/*


*/
