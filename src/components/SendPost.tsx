import { useMutation } from "@apollo/client";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import React, { useContext, useEffect, useRef, useState } from "react";
import { authContext } from "../context/Auth";
import { CREATE_POST } from "../mutations";
import { FETCH_ALL_POSTS } from "../queries";
import "../styles/SendPost.css";
import Avatar from "./Avatar";

const POST_MAX_LENGTH = 255;

const isValidLength = (str: string) => str.trim().length > POST_MAX_LENGTH;

function SendPost() {
  const { user } = useContext(authContext);
  const [value, setValue] = useState("");
  const sendPostRef = useRef<HTMLDivElement>(null);
  const [createPost] = useMutation(CREATE_POST, {
    variables: { body: value },

    onError(err) {
      console.log({ err });
    },

    update(cache, result) {
      const newPost: Post = result.data.createPost;

      const query = cache.readQuery<{ posts: Post[] }>({
        query: FETCH_ALL_POSTS,
      });

      const posts = query ? [...query.posts] : [];

      posts.unshift(newPost);

      cache.writeQuery({
        query: FETCH_ALL_POSTS,
        data: { posts },
      });
      setValue("");
    },
  });

  useEffect(() => {
    if (!sendPostRef.current) return;

    value === ""
      ? sendPostRef.current.classList.remove("filled")
      : sendPostRef.current.classList.add("filled");

    if (isValidLength(value)) {
      sendPostRef.current.classList.add("error");
    } else {
      sendPostRef.current.classList.remove("error");
    }
  }, [value]);

  return (
    <div ref={sendPostRef} className="send-post">
      <div className="container">
        <div className="card-avatar-container">
          <Avatar avatar={user?.avatar} username={user?.username} />
        </div>
        <div className="card-content-editable">
          <label htmlFor="send-post">What're you thinking...</label>
          <TextareaAutosize
            id="send-post"
            value={value}
            onChange={e => setValue(e.target.value)}
          />
          <span className="chars-left">
            {value.trim().length} / {POST_MAX_LENGTH}
          </span>
        </div>

        <button
          disabled={isValidLength(value)}
          onClick={() => createPost()}
          className="send-btn"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default SendPost;
