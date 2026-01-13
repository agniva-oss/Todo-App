import { gql } from "@apollo/client";

export const GET_NOTIFICATIONS = gql`
  query GetNotifications {
    notifications(order_by: { created_at: desc }, limit: 20) {
      id
      title
      message
      type
      is_read
      created_at
    }
  }
`;

export const NOTIFICATION_SUBSCRIPTION = gql`
  subscription OnNotificationAdded {
    notifications(order_by: { created_at: desc }, limit: 1) {
      id
      title
      message
      type
      is_read
      created_at
    }
  }
`;

export const MARK_AS_READ = gql`
  mutation MarkRead($id: uuid!) {
    update_notifications_by_pk(
      pk_columns: { id: $id }
      _set: { is_read: true }
    ) {
      id
      is_read
    }
  }
`;
