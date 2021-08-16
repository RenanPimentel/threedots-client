/// <reference types="react-scripts" />

interface Obj {
  [key: string]: any;
}

interface Input {
  type: InputType;
  label: string;
  value: string;
  name: string;
  error: string;
}

interface User {
  avatar: string;
  createdAt: string;
  username: string;
}

interface SingleUserPage {
  avatar: string;
  createdAt: string;
  username: string;
  posts: Post[];
}

interface Post {
  body: string;
  author: User;
  createdAt: string;
  id: string;
  liked: boolean;
  likeCount: number;
}

type InputType = "text" | "password" | "email";

interface UserWithToken {
  avatar: string;
  createdAt: string;
  token: string;
  username: string;
}

interface MainUser {
  id: string;
  email: string;
  username: string;
  password: string;
  avatar: string;
  token: string;
  createdAt: string;
}

interface AuthContextValue extends AuthContextState {
  setUser?: (user: null | MainUser) => void;
}

interface AuthContextState {
  user: null | MainUser;
}

interface PostsContextValue {
  posts: Post[];
  setPosts(posts: Post[]): void;
  setPost(id: string, post: Obj): void;
}

interface UserToken extends MainUser {
  exp: number;
  iat: number;
}
