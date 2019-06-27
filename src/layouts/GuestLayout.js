import React from "react";

function GuestLayout({ children }) {
  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      {children}
    </div>
  );
}

export default GuestLayout;
