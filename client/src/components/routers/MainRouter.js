import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";

import NoAuthComponent from "../routers/NoAuthComponent";
import PrivateComponent from "../routers/PrivateComponent";
import MenuComponent from "../routers/MenuComponent";

import Entries from "../pages/Entries";
import SingleEntry from "../pages/SingleEntry";
import About from "../pages/About";
import Series from "../pages/Series";
import SingleSeries from "../pages/SingleSeries";
import CurrentSnesList from "../pages/CurrentSnesList";
import Contact from "../pages/Contact";

import EntryState from "../../context/entries/entryState";
import SeriesState from "../../context/series/seriesState";
import GameListState from "../../context/gamelist/gamelistState";
import FaqState from "../../context/about/faqState";
import TicketState from "../../context/tickets/ticketState";

import Login from "../auth/Login";
import Dashboard from "../private/Dashboard";
import AdminRoutes from "./AdminRoutes";

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
        <MenuComponent
          exact
          path="/contact"
          component={Contact}
          context={TicketState}
        />
        <NoAuthComponent exact path="/login" component={Login} />
        <PrivateComponent
          exact
          path="/dashboard"
          component={Dashboard}
          context={Fragment}
        />
        <AdminRoutes />
      </Switch>
    </div>
  );
};

export default MainRouter;
