"use client";

import { useQuery } from "@apollo/client/react";
import { GET_TODOS } from "@/graphql/queries";
import TodoItem from "./TodoItem";
import { Loader2, Circle } from "lucide-react";

type Todo = {
  id: string;
  title: string;
  completed: boolean;
  due_date?: string;
  created_at?: string;
  updated_at?: string;
};

type GetTodosResponse = {
  todos: Todo[];
};

export default function TodoList() {
  const { data, loading, error } = useQuery<GetTodosResponse>(GET_TODOS);

  if (loading) {
    return (
      <div className="text-center py-12">
        <Loader2 className="w-10 h-10 animate-spin mx-auto text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-10">
        Failed to load todos
      </div>
    );
  }

  if (!data?.todos.length) {
    return (
      <div className="text-center py-12 text-gray-400">
        <Circle size={48} className="mx-auto mb-3" />
        <p>No todos yet</p>
      </div>
    );
  }

  const completedCount = data.todos.filter(t => t.completed).length;
  const totalCount = data.todos.length;
  const progress = (completedCount / totalCount) * 100;

  return (
    <>
      <div className="mb-5 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
        <div className="flex items-center justify-between text-sm font-semibold mb-2 gap-2 w-full">
          <span className="text-gray-700 truncate">{completedCount} / {totalCount} completed</span>
          <span className="text-gray-700 flex-shrink-0">{Math.round(progress)}%</span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="space-y-3">
        {data.todos.map((todo, index) => (
          <div
            key={todo.id}
            className="animate-slide-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <TodoItem {...todo} />
          </div>
        ))}
      </div>
    </>
  );
}
