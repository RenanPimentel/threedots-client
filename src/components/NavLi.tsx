import React from "react";
import { Link } from "react-router-dom";

interface Props {
  to: string;
  name: string;
  currPath: string;
}

function NavLi({ to, name, currPath }: Props) {
  return (
    <li className={`${to === currPath ? "active" : ""}`}>
      <Link className="link" to={to}>
        {name}
        <div className="vline-container">
          <div className="vline"></div>
        </div>
      </Link>
    </li>
  );
}

export default NavLi;
