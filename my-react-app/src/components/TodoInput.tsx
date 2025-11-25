import { useState } from "react";

interface TodoInputProps {
  onAdd: (text: string) => void;
}

export default function TodoInput({ onAdd }: TodoInputProps) {
  const [input, setInput] = useState("");

  const handleAdd = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setInput("");
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleAdd();
  };

  return (
    <div className="todo-input">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={onKey}
        placeholder="Add a task and press Enter..."
        aria-label="Add todo"
      />
      <button onClick={handleAdd} aria-label="Add todo">
        Add
      </button>
    </div>
  );
}
