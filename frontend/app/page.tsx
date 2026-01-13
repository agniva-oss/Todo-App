import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";
import Notifications from "@/components/Notifications";

export default function Home() {
  return (
    <>
    <Notifications />

    <main className="min-h-screen flex flex-col items-center justify-start pt-10 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-20 animate-blob" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-200 rounded-full blur-3xl opacity-20 animate-blob animation-delay-4000" />

      <div className="w-full max-w-lg bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 relative z-10">
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            ✨ Todo App
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            Organize your day, one task at a time
          </p>
        </div>

        <TodoForm />
        <TodoList />
      </div>
    </main>
    </>
  );
}
