import React from "react";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";

const PrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state.auth }));
  console.log(user)
  return user ? children : <LoadingToRedirect />;
};

export default PrivateRoute;