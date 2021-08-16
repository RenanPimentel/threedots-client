import React, { useContext, useEffect, useState } from "react";
import { authContext } from "../context/Auth";
import "../styles/Navbar.css";
import NavLi from "./NavLi";

function Navbar() {
  const { user } = useContext(authContext);
  // eslint-disable-next-line no-restricted-globals
  const [currPath, setCurrPath] = useState(location.pathname);

  useEffect(() => {
    new MutationObserver(() => {
      // eslint-disable-next-line no-restricted-globals
      setCurrPath(location.pathname);
    }).observe(document, { subtree: true, childList: true });
  }, []);

  if (user) {
    return (
      <nav className="navbar">
        <ul>
          <NavLi to="/" name="Home" currPath={currPath} />
        </ul>
        <ul>
          <NavLi
            currPath={currPath}
            name="You"
            to={`/users/${user.username}`}
          />
        </ul>
        <div className="nav-under-line"></div>
      </nav>
    );
  }

  return (
    <nav className="navbar">
      <ul>
        <NavLi to="/" name="Home" currPath={currPath} />
      </ul>
      <ul>
        <NavLi to="/login" name="Login" currPath={currPath} />
        <NavLi to="/register" name="Register" currPath={currPath} />
      </ul>
      <div className="nav-under-line"></div>
    </nav>
  );
}

export default Navbar;
