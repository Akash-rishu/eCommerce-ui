import React from "react";

import {
  Navigate
} from "react-router-dom";

function ProtectedRoute({
  children
}) {

  const token =
    localStorage.getItem(
      "token"
    );

  // NOT LOGGED IN
  if (!token) {

    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  // LOGGED IN
  return children;
}

export default ProtectedRoute;