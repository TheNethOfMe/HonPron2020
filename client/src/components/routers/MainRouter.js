import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";

import MenuComponent from "../routers/MenuComponent";
import PrivateComponent from "../routers/PrivateComponent";
import AdminComponent from "../routers/AdminComponent";

import Login from "../auth/Login";

import Entries from "../pages/Entries";
import SingleEntry from "../pages/SingleEntry";
import EntryState from "../../context/entries/entryState";

import About from "../pages/About";
import FaqState from "../../context/about/faqState";

import Series from "../pages/Series";
import SingleSeries from "../pages/SingleSeries";
import SeriesState from "../../context/series/seriesState";

import CurrentSnesList from "../pages/CurrentSnesList";
import ManageLists from "../private/adminOnly/ManageLists";
import UpdateList from "../private/adminOnly/UpdateList";
import GameListState from "../../context/gamelist/gamelistState";

import Contact from "../pages/Contact";
import ViewComment from "../private/adminOnly/ViewComment";
import TicketState from "../../context/tickets/ticketState";

import Dashboard from "../private/Dashboard";

import CreateSeries from "../private/adminOnly/CreateSeries";
import CreateEntry from "../private/adminOnly/CreateEntry";
import ManageEntries from "../private/adminOnly/ManageEntries";
import ManageSeries from "../private/adminOnly/ManageSeries";
import ManageTickets from "../private/adminOnly/ManageTickets";

const MainRouter = () => {
  return (
    <div>
      <Switch>
        <MenuComponent
          exact
          path="/"
          component={Entries}
          context={EntryState}
        />
        <MenuComponent
          exact
          path="/entry/:id"
          component={SingleEntry}
          context={EntryState}
        />
        <MenuComponent
          exact
          path="/entries/:type"
          component={Entries}
          context={EntryState}
        />
        <MenuComponent
          exact
          path="/series"
          component={Series}
          context={SeriesState}
        />
        <MenuComponent
          exact
          path="/series/:name"
          component={SingleSeries}
          context={SeriesState}
        />
        <MenuComponent
          exact
          path="/snes"
          component={CurrentSnesList}
          context={GameListState}
        />
        <MenuComponent
          exact
          path="/about"
          component={About}
          context={FaqState}
        />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/login" component={Login} />
        <PrivateComponent
          exact
          path="/dashboard"
          component={Dashboard}
          context={Fragment}
        />
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
      </Switch>
    </div>
  );
};

export default MainRouter;
