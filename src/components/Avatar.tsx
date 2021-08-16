import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Avatar.css";

interface Props {
  avatar?: string;
  username?: string;
  size?: number;
}

function Avatar({ avatar, username, size }: Props) {
  const [to] = useState(`/users/${username}`);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!imgRef.current) return;

    imgRef.current.style.height = `${size}px`;
    imgRef.current.style.width = `${size}px`;
  }, [size]);

  return (
    <div className="same-line">
      <Link to={to} className="img-container">
        <img src={avatar} alt={`${username} avatar`} ref={imgRef} />
      </Link>
    </div>
  );
}

export default Avatar;
