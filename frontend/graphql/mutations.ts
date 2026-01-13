import { gql } from "@apollo/client";

export const ADD_TODO = gql`
  mutation AddTodo($title: String!, $due_date: timestamptz) {
    insert_todos_one(object: { title: $title, due_date: $due_date }) {
      id
      title
      completed
      due_date
    }
  }
`;

export const UPDATE_TODO = gql`
  mutation UpdateTodo($id: uuid!, $completed: Boolean!, $updated_at: timestamptz!, $due_date: timestamptz) {
    update_todos_by_pk(
      pk_columns: { id: $id }
      _set: { completed: $completed, updated_at: $updated_at, due_date: $due_date }
    ) {
      id
      completed
      due_date
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
