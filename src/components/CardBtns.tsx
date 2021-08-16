import { DocumentNode, useMutation } from "@apollo/client";
import React, { useContext, useState } from "react";
import { FaHeart, FaPencilAlt, FaRegHeart, FaTrashAlt } from "react-icons/fa";
import { authContext } from "../context/Auth";
import { DELETE_POST, LIKE_POST } from "../mutations";
import Popup from "./Popup";

interface Props {
  query: DocumentNode;
  variables: Obj;
  postId: string;
  author: User;
  liked: boolean;
  likeCount: number;
}

function CardBtns({
  postId,
  author,
  liked,
  likeCount,
  query,
  variables,
}: Props) {
  const { user } = useContext(authContext);
  const [showPopup, setShowPopup] = useState(false);
  const [likePost, { loading }] = useMutation(LIKE_POST, {
    variables: { postId },

    update(cache) {
      const cached = cache.readQuery<{ posts: Post[] }>({
        query,
        variables,
      });
      const posts =
        cached?.posts.map(post =>
          post.id === postId
            ? {
                ...post,
                liked: !post.liked,
                likeCount: likeCount + (post.liked ? -1 : 1),
              }
            : post
        ) || [];

      cache.writeQuery({ query, data: { posts }, variables });
    },
  });
  const [deletePost] = useMutation(DELETE_POST, {
    variables: { postId },

    update(cache) {
      const cached = cache.readQuery<{ posts: Post[] }>({
        query,
      });
      const posts = cached?.posts.filter(post => post.id !== postId) || [];

      cache.writeQuery({ query, data: { posts } });
    },
  });

  const handleDelete = () => {
    setShowPopup(true);
  };

  const handleEdit = () => {};

  return (
    <section className="card-btns">
      {showPopup && (
        <Popup
          setShowPopup={setShowPopup}
          question="Do you wanna delete this post?"
          btn={{
            className: "red-bg",
            value: "Delete",
          }}
          onAccept={() => deletePost()}
        />
      )}
      <div className="left-container">
        <div className="likes">
          <button
            className="like-btn svg-container"
            disabled={loading}
            onClick={() => likePost()}
          >
            {liked ? <FaHeart /> : <FaRegHeart />}
          </button>
          <span>{likeCount}</span>
        </div>
      </div>
      <div className="edit-container">
        {author.username === user?.username && (
          <>
            <button className="trash-btn svg-container" onClick={handleDelete}>
              <FaTrashAlt />
            </button>
            <button className="edit-btn svg-container" onClick={handleEdit}>
              <FaPencilAlt />
            </button>
          </>
        )}
      </div>
    </section>
  );
}

export default CardBtns;
