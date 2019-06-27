import React, { useEffect } from "react";

import { useStoreActions, useStoreState } from "easy-peasy";

import {
  Navbar,
  NavbarBrand,
  Nav,
  Collapse,
  Button,
  NavItem
} from "reactstrap";
import { Link } from "react-router-dom";

function AuthLayout({ children }) {
  const isAdmin = useStoreState(
    state =>
      state.auth.profile &&
      state.auth.profile.roles.some(item => item === "ADMIN")
  );
  const getProfile = useStoreActions(actions => actions.auth.getUser);
  const logout = useStoreActions(actions => actions.auth.logout);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  const navLinks = isAdmin ? (
    <>
      <Link className="nav-link" to="/buses">
        Buses
      </Link>
      <Link className="nav-link" to="/routes">
        Routes
      </Link>
      <Link className="nav-link" to="/cities">
        Cities
      </Link>
      <Link className="nav-link" to="/amenities">
        Amenities
      </Link>
      <Link className="nav-link" to="/intervals">
        Intervals
      </Link>
    </>
  ) : null;

  return (
    <>
      <Navbar bg="light" expand="lg">
        <NavbarBrand>Globotrans</NavbarBrand>
        <Nav className="mr-auto">
          <Link className="nav-link" to="/">
            Home
          </Link>
          {navLinks}
          <Collapse isOpen navbar>
            <Nav className="ml-auto">
              <NavItem>
                <Button type="secondary" onClick={() => logout()}>
                  Log out
                </Button>
              </NavItem>
            </Nav>
          </Collapse>
        </Nav>
      </Navbar>
      {children}
    </>
  );
}

export default AuthLayout;
