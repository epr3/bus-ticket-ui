import React from "react";
import { Router, Route, Switch } from "react-router-dom";

import history from "./lib/history";

import PrivateRoute from "./components/PrivateRoute";

import Login from "./views/Login";
import Register from "./views/Register";
import Home from "./views/Home";
import Buses from "./views/Buses";
import Cities from "./views/Cities";

import ModalContainer from "./containers/ModalContainer";

function App() {
  return (
    <>
      <Router history={history}>
        <Switch>
          <PrivateRoute path="/cities" component={Cities} />
          <PrivateRoute path="/buses" component={Buses} />
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </Switch>
      </Router>
      <ModalContainer />
    </>
  );
}

export default App;
