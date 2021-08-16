import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/ChangeInputType.css";

interface Props {
  type: InputType;
  to: string;
  onClick(e: React.MouseEvent<HTMLElement, MouseEvent>): void;
}

function ChangeInputType({ to, type, onClick }: Props) {
  return (
    <label htmlFor={to} className="input-eye" onClick={onClick}>
      {type === "text" ? <FaEyeSlash /> : <FaEye />}
    </label>
  );
}

export default ChangeInputType;
