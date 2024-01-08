// AuthenticatedRoute.js
import React from "react";
import { Route, Navigate } from "react-router-dom";

const fakeAuth = {
  isAuthenticated: () => {
    return !!localStorage.getItem("chat-app-user");
  },
};

const AuthenticatedRoute = ({ element: Element, ...rest }) => {
  return (
    <Route
      {...rest}
      element={fakeAuth.isAuthenticated() ? <Element /> : <Navigate to="/login" replace />}
    />
  );
};

export default AuthenticatedRoute;
