import React from "react";
import { Router, Route, Switch } from "react-router-dom";

import history from "./lib/history";

import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router history={history}>
      <Switch>
      </Switch>
    </Router>
  );
}

export default App;
