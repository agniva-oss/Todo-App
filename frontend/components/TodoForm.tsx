"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { ADD_TODO } from "@/graphql/mutations";
import { GET_TODOS } from "@/graphql/queries";
import { Plus } from "lucide-react";

export default function TodoForm() {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");

  const [addTodo, { loading }] = useMutation(ADD_TODO, {
    refetchQueries: [GET_TODOS],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const variables: any = { title };
    if (dueDate) {
      variables.due_date = new Date(dueDate).toISOString();
    }

    await addTodo({ variables });
    setTitle("");
    setDueDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex flex-col gap-4">
      <input
        className="px-5 py-3 border-2 border-gray-200 rounded-xl bg-white text-gray-700 placeholder-gray-500 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-400 outline-none transition"
        placeholder="What needs to be done?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={loading}
      />

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-600">Due Date (Optional)</label>
        <input
          type="datetime-local"
          className="px-5 py-3 border-2 border-gray-200 rounded-xl bg-white text-gray-700 focus:ring-2 focus:ring-blue-400 outline-none transition"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          disabled={loading}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg hover:scale-105 transition disabled:opacity-50 w-full"
      >
        <Plus size={20} />
        {loading ? "Adding..." : "Add"}
      </button>
    </form>
  );
}
