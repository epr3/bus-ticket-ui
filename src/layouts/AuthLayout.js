import React, { useEffect } from "react";

import { useStoreActions, useStoreState } from "easy-peasy";

import { Navbar, NavbarBrand, Nav } from "reactstrap";
import { Link } from "react-router-dom";

function AuthLayout({ children }) {
  const isAdmin = useStoreState(
    state =>
      state.auth.profile &&
      state.auth.profile.roles.some(item => item === "ADMIN")
  );
  const getProfile = useStoreActions(actions => actions.auth.getUser);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  const navLinks = isAdmin ? (
    <>
      <Link className="nav-link" to="/buses">
        Buses
      </Link>
      <Link className="nav-link" to="/cities">
        Cities
      </Link>
      <Link className="nav-link" to="/intervals">
        Intervals
      </Link>
      <Link className="nav-link" to="/tickets">
        Sold tickets
      </Link>
    </>
  ) : null;

  return (
    <>
      <Navbar bg="light" expand="lg">
        <NavbarBrand>Globotrans</NavbarBrand>
        <Nav className="mr-auto">
          <Link className="nav-link" to="/home">
            Home
          </Link>
          {navLinks}
        </Nav>
      </Navbar>
      {children}
    </>
  );
}

export default AuthLayout;
