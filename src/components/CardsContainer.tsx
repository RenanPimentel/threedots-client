import { DocumentNode, useQuery } from "@apollo/client";
import React, { useCallback, useEffect, useState } from "react";
import { client } from "../MyApolloProvider";
import Card from "./Card";

interface Props {
  query: DocumentNode;
  variables?: Obj;
  infiniteScroll?: boolean;
  title?: string;
}

function CardsContainer({ query, variables, infiniteScroll, title }: Props) {
  const [loading, setLoading] = useState(true);
  const { data } = useQuery<{ posts: Post[] }>(query, {
    variables,

    onError(err) {
      console.log({ err });
    },

    onCompleted() {
      setLoading(false);
    },
  });

  const queryPosts = useCallback(() => {
    const cached = client.readQuery<{ posts: Post[] }>({
      query,
      variables,
    });

    client
      .query({
        query,
        variables: { ...variables, postsLength: cached?.posts.length },
      })
      .then(({ data }) => {
        const queriedPosts: Post[] = data.posts;
        const cachedPosts = cached?.posts || [];

        const singleQueriedPosts = queriedPosts.filter(post =>
          cachedPosts.every(p => p.id !== post.id)
        );

        client.writeQuery({
          query,
          data: { posts: [...cachedPosts, ...singleQueriedPosts] },
          variables,
        });
      });
  }, [query, variables]);

  useEffect(() => {
    if (!infiniteScroll) return;

    const scrollEvent: any = window.addEventListener("scroll", () => {
      const pxToBottom =
        document.body.scrollHeight - (window.innerHeight + window.scrollY);

      if (pxToBottom <= 100) {
        queryPosts();
      }
    });

    return () => window.removeEventListener("scroll", scrollEvent);
  }, [infiniteScroll, queryPosts]);

  if (data?.posts.length === 0) {
    return (
      <div>
        <h1>No posts</h1>
      </div>
    );
  }

  return (
    <>
      <section className="posts-container">
        {!loading && <h2>{title}</h2>}
        {data?.posts.map(
          ({ author, body, id, createdAt, likeCount, liked }) => (
            <Card
              body={body}
              author={author}
              createdAt={createdAt}
              likeCount={likeCount}
              liked={liked}
              query={query}
              variables={variables || {}}
              id={id}
              key={id}
            />
          )
        )}
      </section>
      {loading && (
        <div>
          <h1>Loading...</h1>
        </div>
      )}
    </>
  );
}

export default CardsContainer;
