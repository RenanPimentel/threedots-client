import { DocumentNode } from "@apollo/client";
import moment from "moment";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../context/Auth";
import "../styles/Card.css";
import Avatar from "./Avatar";
import CardBtns from "./CardBtns";

interface Props {
  query: DocumentNode;
  author: User;
  body: string;
  id: string;
  createdAt: string;
  liked: boolean;
  likeCount: number;
  variables: Obj;
}

function Card({
  body,
  author,
  id,
  createdAt,
  liked,
  likeCount,
  query,
  variables,
}: Props) {
  const { user } = useContext(authContext);

  return (
    <div className="card">
      <div className="card-avatar-container">
        <Avatar {...author} />
      </div>
      <div className="card-container">
        <div className="card-content">
          <header className="between">
            <Link className="user-link" to={`/users/${author.username}`}>
              {author.username}
            </Link>
            <i>{moment(createdAt).fromNow()}</i>
          </header>
          <p className="body">
            <Link to={`/posts/${id}`}>{body}</Link>
          </p>
        </div>
        {user && (
          <footer className="card-footer">
            <CardBtns
              postId={id}
              author={author}
              liked={liked}
              likeCount={likeCount}
              query={query}
              variables={variables}
            />
          </footer>
        )}
      </div>
    </div>
  );
}

export default Card;
