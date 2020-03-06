import React, { useReducer, useContext } from "react";
import axios from "axios";
import stringifyQueryParams from "../../utils/stringifyQueryParams";
import TicketContext from "./ticketContext";
import ticketReducer from "./ticketReducer";
import AuthContext from "../auth/authContext";
import { GET_ALL_TICKETS, GET_ONE_TICKET, DELETE_TICKET } from "../types";

const TicketState = props => {
  const authContext = useContext(AuthContext);
  const { setError } = authContext;
  const initialState = {
    tickets: [],
    pagination: {},
    singleTicket: {}
  };

  const [state, dispatch] = useReducer(ticketReducer, initialState);

  // get all tickets
  const getAllTickets = async params => {
    let endpoint = "/api/v1/tickets";
    if (Object.keys(params).length) {
      const queryParams = stringifyQueryParams(params, "?");
      endpoint += queryParams;
    }
    try {
      const res = await axios.get(endpoint);
      dispatch({
        type: GET_ALL_TICKETS,
        payload: res.data
      });
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  // get one ticket
  const getOneTicket = async id => {
    try {
      const res = await axios.get(`/api/v1/tickets/${id}`);
      dispatch({
        type: GET_ONE_TICKET,
        payload: res.data
      });
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  // create ticket
  const createTicket = async ticketData => {
    try {
      await axios.post("/api/v1/tickets", ticketData);
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  // update one ticket
  const updateOneTicket = async (id, updateFields) => {
    try {
      await axios.put(`/api/v1/tickets/${id}`, updateFields);
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  // delete one ticket
  const deleteTicket = async id => {
    try {
      await axios.delete(`api/v1/tickets/${id}`);
      dispatch({
        type: DELETE_TICKET,
        payload: id
      });
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  return (
    <TicketContext.Provider
      value={{
        tickets: state.tickets,
        pagination: state.pagination,
        singleTicket: state.singleTicket,
        getAllTickets,
        getOneTicket,
        createTicket,
        updateOneTicket,
        deleteTicket
      }}
    >
      {props.children}
    </TicketContext.Provider>
  );
};

export default TicketState;
