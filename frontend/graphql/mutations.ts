import { gql } from "@apollo/client";

export const ADD_TODO = gql`
  mutation AddTodo($title: String!) {
    insert_todos_one(object: { title: $title }) {
      id
      title
      completed
    }
  }
`;

export const UPDATE_TODO = gql`
  mutation UpdateTodo($id: uuid!, $completed: Boolean!, $updated_at: timestamptz!) {
    update_todos_by_pk(
      pk_columns: { id: $id }
      _set: { completed: $completed, updated_at: $updated_at }
    ) {
      id
      completed
    }
  }
`;

export const DELETE_TODO = gql`
  mutation DeleteTodo($id: uuid!) {
    delete_todos_by_pk(id: $id) {
      id
    }
  }
`;
