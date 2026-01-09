"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { ADD_TODO } from "@/graphql/mutations";
import { GET_TODOS } from "@/graphql/queries";
import { Plus } from "lucide-react";

export default function TodoForm() {
  const [title, setTitle] = useState("");

  const [addTodo, { loading }] = useMutation(ADD_TODO, {
    refetchQueries: [GET_TODOS],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    await addTodo({ variables: { title } });
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex gap-3">
      <input
        className="flex-1 px-5 py-3 border-2 border-gray-200 rounded-xl bg-white text-gray-700 placeholder-gray-500 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-400 outline-none transition"
        placeholder="What needs to be done?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={loading}
      />

      <button
        type="submit"
        disabled={loading}
        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold flex items-center gap-2 shadow-lg hover:scale-105 transition disabled:opacity-50"
      >
        <Plus size={20} />
        {loading ? "Adding..." : "Add"}
      </button>
    </form>
  );
}
