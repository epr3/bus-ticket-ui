import React from "react";
import { Redirect, Route } from "react-router-dom";

const isAuth = !!localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN_PATH);

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        isAuth ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

export default PrivateRoute;
