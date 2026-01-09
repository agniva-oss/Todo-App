import { gql } from "@apollo/client";

export const GET_TODOS = gql`
  query GetTodos {
    todos(order_by: { created_at: desc }) {
      id
      title
      completed
      created_at
      updated_at
    }
  }
`;
