import React from "react";
import { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { authContext } from "../context/Auth";

interface Props {
  component: React.ComponentType<any>;
  path: string;
}

function AuthRoute({ component, path }: Props) {
  const { user } = useContext(authContext);

  if (user) {
    return <Redirect to="/" />;
  }

  return <Route exact path={path} component={component} />;
}

export default AuthRoute;
