import React from "react";
import { useStoreState } from "easy-peasy";

import AuthLayout from "../layouts/AuthLayout";
import AdminHome from "../containers/AdminHome";
import PassengerHome from "../containers/PassengerHome";

function Home() {
  const profile = useStoreState(state => state.auth.profile);
  let render = null;

  if (profile && render === null) {
    if (profile.roles.some(item => item === "ADMIN")) {
      render = <AdminHome />;
    } else if (profile.roles.some(item => item === "PASSENGER")) {
      render = <PassengerHome />;
    }
  }

  return (
    <AuthLayout>
      {render}
    </AuthLayout>
  );
}

export default Home;
