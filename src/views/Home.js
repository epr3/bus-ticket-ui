import React from "react";
import { useStoreState } from "easy-peasy";

import AuthLayout from "../layouts/AuthLayout";
import AdminHome from "../containers/AdminHome";

function Home() {
  const profile = useStoreState(state => state.auth.profile);
  let render = null;

  if (profile && render === null) {
    if (profile.roles.some(item => item === "ADMIN")) {
      render = <AdminHome />;
    }
  }

  return (
    <AuthLayout>
      {render}
    </AuthLayout>
  );
}

export default Home;
