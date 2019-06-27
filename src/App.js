import React from "react";
import { Router, Route, Switch } from "react-router-dom";

import history from "./lib/history";

import PrivateRoute from "./components/PrivateRoute";

import Login from "./views/Login";
import Home from "./views/Home";
import Buses from "./views/Buses";
import Cities from "./views/Cities";
import Routes from "./views/RoutesView";
import Amenities from "./views/Amenities";
import Intervals from "./views/Intervals";

import ModalContainer from "./containers/ModalContainer";

function App() {
  return (
    <>
      <Router history={history}>
        <Switch>
          <PrivateRoute path="/intervals" component={Intervals} />
          <PrivateRoute path="/amenities" component={Amenities} />
          <PrivateRoute path="/routes" component={Routes} />
          <PrivateRoute path="/cities" component={Cities} />
          <PrivateRoute path="/buses" component={Buses} />
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </Router>
      <ModalContainer />
    </>
  );
}

export default App;
