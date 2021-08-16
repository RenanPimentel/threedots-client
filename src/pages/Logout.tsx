import React, { useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { authContext } from "../context/Auth";

function Logout() {
  const { setUser } = useContext(authContext);

  useEffect(() => {
    if (setUser) setUser(null);
  }, [setUser]);

  return <Redirect to="/" />;
}

export default Logout;
