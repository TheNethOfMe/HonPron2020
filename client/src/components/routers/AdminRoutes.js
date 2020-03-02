import React, { Fragment } from "react";
import AdminComponent from "./AdminComponent";
// components
import CreateSeries from "../private/adminOnly/CreateSeries";
import CreateEntry from "../private/adminOnly/CreateEntry";
import ManageEntries from "../private/adminOnly/ManageEntries";
import ManageSeries from "../private/adminOnly/ManageSeries";
import ManageTickets from "../private/adminOnly/ManageTickets";
import ManageLists from "../private/adminOnly/ManageLists";
import UpdateList from "../private/adminOnly/UpdateList";
import ViewComment from "../private/adminOnly/ViewComment";
import ManageMenu from "../private/adminOnly/ManageMenu";
// contexts
import SeriesState from "../../context/series/seriesState";
import EntryState from "../../context/entries/entryState";
import GameListState from "../../context/gamelist/gamelistState";
import TicketState from "../../context/tickets/ticketState";
import MenuState from "../../context/menu/menuState";

const AdminRoutes = () => {
  return (
    <Fragment>
      <AdminComponent
        exact
        path="/create-series"
        component={CreateSeries}
        context={SeriesState}
      />
      <AdminComponent
        exact
        path="/create-entry"
        component={CreateEntry}
        context={EntryState}
      />
      <AdminComponent
        exact
        path="/manage-entries"
        component={ManageEntries}
        context={EntryState}
      />
      <AdminComponent
        exact
        path="/edit-entry/:id"
        component={CreateEntry}
        context={EntryState}
      />
      <AdminComponent
        exact
        path="/manage-series"
        component={ManageSeries}
        context={SeriesState}
      />
      <AdminComponent
        exact
        path="/edit-series/:id"
        component={CreateSeries}
        context={SeriesState}
      />
      <AdminComponent
        exact
        path="/manage-lists"
        component={ManageLists}
        context={GameListState}
      />
      <AdminComponent
        exact
        path="/edit-list/:id"
        component={UpdateList}
        context={GameListState}
      />
      <AdminComponent
        exact
        path="/manage-tickets/"
        component={ManageTickets}
        context={TicketState}
      />
      <AdminComponent
        exact
        path="/edit-ticket/:id"
        component={ViewComment}
        context={TicketState}
      />
      <AdminComponent
        exact
        path="/manage-menu"
        component={ManageMenu}
        context={MenuState}
      />
    </Fragment>
  );
};

export default AdminRoutes;
