import React from "react";

import AuthHandler from "./components/routers/AuthHandler";
import AuthState from "./context/auth/authState";

import "./App.scss";

function App() {
  return (
    <AuthState>
      <AuthHandler />
    </AuthState>
  );
}

export default App;
