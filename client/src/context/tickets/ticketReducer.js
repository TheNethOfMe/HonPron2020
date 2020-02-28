import { GET_ALL_TICKETS, GET_ONE_TICKET, DELETE_TICKET } from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_ALL_TICKETS:
      return {
        ...state,
        tickets: action.payload.data,
        pagination: action.payload.pagination
      };
    case GET_ONE_TICKET:
      return {
        ...state,
        singleTicket: action.payload.data
      };
    case DELETE_TICKET:
      return {
        ...state,
        tickets: state.tickets.filter(ticket => ticket._id !== action.payload)
      };
    default:
      return {
        ...state
      };
  }
};
