import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import React from "react";

const httpLink = new HttpLink({ uri: "http://localhost:4000" });

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("userT");
  return { headers: { ...headers, Authorization: `Bearer ${token}` } };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function MyApolloProvider(props: { children: JSX.Element }) {
  return <ApolloProvider {...props} client={client} />;
}

export { MyApolloProvider, client };
