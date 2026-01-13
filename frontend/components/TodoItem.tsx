"use client";

import { useMutation } from "@apollo/client/react";
import { UPDATE_TODO, DELETE_TODO } from "@/graphql/mutations";
import { GET_TODOS } from "@/graphql/queries";
import { Check, Trash2, Loader2 } from "lucide-react";
import { useState } from "react";

type Props = {
  id: string;
  title: string;
  completed: boolean;
  due_date?: string;
  updated_at?: string;
  created_at?: string;
};

const formatUpdatedAt = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  return date.toLocaleDateString();
};

export default function TodoItem({ id, title, completed, due_date, updated_at, created_at }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const [updateTodo] = useMutation(UPDATE_TODO, {
    refetchQueries: [GET_TODOS],
  });

  const [deleteTodo] = useMutation(DELETE_TODO, {
    refetchQueries: [GET_TODOS],
  });

  const handleUpdateTodo = () => {
    setIsLoading(true);
    const now = new Date().toISOString();
    updateTodo({ variables: { id, completed: !completed, updated_at: now } })
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  };

  const handleDeleteTodo = () => {
    setIsLoading(true);
    const now = new Date().toISOString();

    updateTodo({ variables: { id, completed, updated_at: now } })
      .then(() => deleteTodo({ variables: { id } }))
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  };

  return (
    <div className="group flex items-center gap-4 p-4 border-2 border-gray-100 rounded-xl hover:border-blue-200 hover:shadow transition">
      <button
        onClick={handleUpdateTodo}
        disabled={isLoading}
        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${
          isLoading
            ? "bg-gray-200 border-gray-300"
            : completed
            ? "bg-gradient-to-r from-blue-500 to-purple-600 border-transparent"
            : "border-gray-300"
        }`}
      >
        {isLoading ? (
          <Loader2 size={14} className="animate-spin text-gray-600" />
        ) : (
          completed && <Check size={14} className="text-white" />
        )}
      </button>

      <div className="flex-1">
        <div className="flex items-center justify-between gap-3">
          <span
            className={`text-lg block truncate ${
              completed ? "line-through text-gray-400" : "text-gray-700"
            }`}
          >
            {title}
          </span>

          <button
            onClick={handleDeleteTodo}
            disabled={isLoading}
            className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 text-red-500 hover:bg-red-50 p-2 rounded-lg transition disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Trash2 size={18} />
            )}
          </button>
        </div>

        <div className="mt-2 w-full text-xs text-gray-400 flex gap-3 flex-wrap">
          {due_date && (
            <span className="truncate text-blue-500">
              Due: {new Date(due_date).toLocaleDateString()} {new Date(due_date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
          )}
          {created_at && (
            <span className="truncate">Created {formatUpdatedAt(created_at)}</span>
          )}
          {updated_at && (
            <span className="truncate">Updated {formatUpdatedAt(updated_at)}</span>
          )}
        </div>
      </div>
    </div>
  );
}
