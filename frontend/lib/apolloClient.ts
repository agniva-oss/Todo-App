import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_HASURA_ENDPOINT,
  headers: {
    "x-hasura-admin-secret":
      process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET!,
  },
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
