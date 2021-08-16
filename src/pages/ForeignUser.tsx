import React from "react";
import CardsContainer from "../components/CardsContainer";
import { FETCH_USER_POSTS } from "../queries";

interface Props extends SingleUserPage {}

function ForeignUser({ avatar, createdAt, posts, username }: Props) {
  return (
    <section>
      <div>
        <CardsContainer
          infiniteScroll={true}
          variables={{ authorUsername: username }}
          query={FETCH_USER_POSTS}
          title={`${username} posts`}
        />
      </div>
    </section>
  );
}

export default ForeignUser;
