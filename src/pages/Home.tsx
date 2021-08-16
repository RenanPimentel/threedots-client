import React, { useContext } from "react";
import CardsContainer from "../components/CardsContainer";
import SendPost from "../components/SendPost";
import { authContext } from "../context/Auth";
import { FETCH_ALL_POSTS } from "../queries";

function Home() {
  const { user } = useContext(authContext);

  return (
    <section>
      {user && <SendPost />}
      <CardsContainer query={FETCH_ALL_POSTS} infiniteScroll={true} />
    </section>
  );
}

export default Home;
