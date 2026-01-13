"use client";

import { useQuery, useMutation, useSubscription } from "@apollo/client/react";
import {
  GET_NOTIFICATIONS,
  NOTIFICATION_SUBSCRIPTION,
  MARK_AS_READ,
} from "@/graphql/notifications";
import { Bell } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

type Notification = {
  id: string;
  title: string;
  message: string;
  type: string;
  is_read: boolean;
  created_at: string;
};

type GetNotificationsResponse = {
  notifications: Notification[];
};

type NotificationSubscriptionResponse = {
  notifications: Notification[];
};

export default function Notifications() {
  const [open, setOpen] = useState(false);

  const { data, refetch } = useQuery<GetNotificationsResponse>(
    GET_NOTIFICATIONS
  );

  const [markRead] = useMutation(MARK_AS_READ);

  useSubscription<NotificationSubscriptionResponse>(NOTIFICATION_SUBSCRIPTION, {
    onData: ({ data }) => {
      const newNotification =
        data?.data?.notifications?.[0] as Notification | undefined;

      refetch();

      if (newNotification) {
        toast.info(
          <div>
            <p className="font-semibold">{newNotification.title}</p>
            <p className="text-sm">{newNotification.message}</p>
          </div>,
          {
            onClick: () => setOpen(true),
          }
        );
      }
    },
  });

  const notifications = data?.notifications ?? [];
  const unreadCount = notifications.filter((n) => !n.is_read).length;

  return (
    <>
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setOpen(!open)}
          className="relative p-3 bg-white rounded-full shadow-md"
        >
          <Bell />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-2 rounded-full">
              {unreadCount}
            </span>
          )}
        </button>
      </div>

      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {open && (
        <div
          className="
            fixed z-50 bg-white shadow-xl
            w-full bottom-0 rounded-t-2xl p-4
            md:w-96 md:top-16 md:right-4 md:bottom-auto md:rounded-xl
          "
        >
          <h3 className="font-semibold mb-3">Notifications</h3>

          {!notifications.length && (
            <p className="text-sm text-gray-400">No notifications</p>
          )}

          <div className="space-y-2 max-h-[60vh] overflow-y-auto">
            {notifications.map((n) => (
              <div
                key={n.id}
                className={`p-3 rounded-lg border cursor-pointer transition ${
                  n.is_read ? "bg-gray-50" : "bg-blue-50"
                }`}
                onClick={() => {
                  markRead({ variables: { id: n.id } });
                  setOpen(true);
                }}
              >
                <p className="font-medium text-sm">{n.title}</p>
                <p className="text-xs text-gray-600">{n.message}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(n.created_at).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
