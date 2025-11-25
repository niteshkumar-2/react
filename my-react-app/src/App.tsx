import { useEffect, useState } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: number;
}

const STORAGE_KEY = "react-ts-todos-v1";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  // Load from localStorage once
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setTodos(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  // Persist to localStorage on todos change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const newTodo: Todo = {
      id: Date.now(),
      text: trimmed,
      completed: false,
      createdAt: Date.now(),
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const editTodo = (id: number, newText: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text: newText } : t))
    );
  };

  const toggleComplete = (id: number) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const filtered = todos
    .filter((t) => {
      if (filter === "active") return !t.completed;
      if (filter === "completed") return t.completed;
      return true;
    })
    .filter((t) => t.text.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="app-root">
      <div className="card">
        <h1 className="title">Todo App</h1>

        <TodoInput onAdd={addTodo} />

        <div className="controls">
          <input
            className="search"
            placeholder="Search todos..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <div className="filters" role="tablist" aria-label="Filters">
            <button
              className={filter === "all" ? "active" : ""}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              className={filter === "active" ? "active" : ""}
              onClick={() => setFilter("active")}
            >
              Active
            </button>
            <button
              className={filter === "completed" ? "active" : ""}
              onClick={() => setFilter("completed")}
            >
              Completed
            </button>
          </div>
        </div>

        <TodoList
          todos={filtered}
          onDelete={deleteTodo}
          onEdit={editTodo}
          onToggle={toggleComplete}
        />
      </div>
    </div>
  );
}

export default App;
