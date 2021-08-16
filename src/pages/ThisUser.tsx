import React from "react";
import CardsContainer from "../components/CardsContainer";
import { FETCH_USER_POSTS } from "../queries";

interface Props extends SingleUserPage {}

function ThisUser({ avatar, createdAt, username }: Props) {
  return (
    <section>
      <div>
        <CardsContainer
          infiniteScroll={true}
          variables={{ authorUsername: username }}
          query={FETCH_USER_POSTS}
          title="Your posts"
        />
      </div>
    </section>
  );
}

export default ThisUser;
