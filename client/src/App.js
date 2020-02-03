import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AuthState from "./context/auth/authState";
import Login from "./components/auth/Login";

// import BasicComponent from "./components/routers/BasicComponent";
import MenuComponent from "./components/routers/MenuComponent";
import Navbar from "./components/base/Navbar";

import Entries from "./components/pages/Entries";
import EntryState from "./context/entries/entryState";

import About from "./components/pages/About";
import FaqState from "./context/about/faqState";

import Series from "./components/pages/Series";
import SingleSeries from "./components/pages/SingleSeries";
import SeriesState from "./context/series/seriesState";

import "./App.scss";

function App() {
  return (
    <AuthState>
      <Router>
        <Fragment>
          <Navbar />
          <div className="site-container">
            <Switch>
              <MenuComponent
                exact
                path="/"
                component={Entries}
                context={EntryState}
              />
              <MenuComponent
                exact
                path="/about"
                component={About}
                context={FaqState}
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
              <Route exact path="/login" component={Login} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </AuthState>
  );
}

export default App;
