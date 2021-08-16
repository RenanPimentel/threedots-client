import { useQuery } from "@apollo/client";
import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { authContext } from "../context/Auth";
import { FETCH_USER } from "../queries";
import ForeignUser from "./ForeignUser";
import ThisUser from "./ThisUser";

function UserAlt() {
  const { user } = useContext(authContext);
  const { username } = useParams<{ username: string }>();
  const { data, loading } = useQuery(FETCH_USER, {
    variables: { username },

    onError(err) {
      console.log({ err });
    },
  });

  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (user?.username === username) {
    return <ThisUser {...data?.user} />;
  }

  return <ForeignUser {...data?.user} />;
}

export default UserAlt;
