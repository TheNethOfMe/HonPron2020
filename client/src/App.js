import React, { Fragment } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import AuthState from "./context/auth/authState";
import Navbar from "./components/base/Navbar";
import MainRouter from "./components/routers/MainRouter";

import "./App.scss";

function App() {
  return (
    <AuthState>
      <Router>
        <Fragment>
          <Navbar />
          <div className="site-container">
            <MainRouter />
          </div>
        </Fragment>
      </Router>
    </AuthState>
  );
}

export default App;
