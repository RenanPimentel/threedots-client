import jwtDecode from "jwt-decode";
import React, { createContext, useReducer } from "react";
import { reducer } from "./reducer";

const getDefaultState = (): AuthContextState => {
  const token = localStorage.getItem("userT");

  if (!token) return { user: null };

  const decodedUser = jwtDecode<UserToken>(token);
  const { avatar, createdAt, email, id, password, username, exp } = decodedUser;

  if (new Date() > new Date(exp * 1000)) {
    localStorage.removeItem("userT");
    return { user: null };
  }

  return { user: { avatar, createdAt, token, username, email, id, password } };
};

const authContext = createContext<AuthContextValue>({ user: null });

function AuthProvider(props: any) {
  const [state, dispatch] = useReducer(reducer, getDefaultState());

  const setUser = (user: MainUser | null) => {
    if (user === null) {
      localStorage.removeItem("userT");
    } else {
      user.username = user.username.toLowerCase();
      localStorage.setItem("userT", user.token);
    }
    dispatch({ type: "SET_USER", payload: user });
  };

  const value: AuthContextValue = { ...state, setUser };

  return <authContext.Provider value={value} {...props} />;
}

export { AuthProvider, authContext };
