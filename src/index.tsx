import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthProvider } from "./context/Auth";
import { MyApolloProvider } from "./MyApolloProvider";
import "./styles/common.css";

ReactDOM.render(
  <MyApolloProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </MyApolloProvider>,
  document.getElementById("root")
);
