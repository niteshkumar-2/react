import { useState } from "react";
import type { Todo } from "../App";

interface Props {
  todos: Todo[];
  onDelete: (id: number) => void;
  onEdit: (id: number, newText: string) => void;
  onToggle: (id: number) => void;
}

export default function TodoList({ todos, onDelete, onEdit, onToggle }: Props) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  const startEdit = (t: Todo) => {
    setEditingId(t.id);
    setEditText(t.text);
  };

  const saveEdit = (id: number) => {
    const trimmed = editText.trim();
    if (!trimmed) return;
    onEdit(id, trimmed);
    setEditingId(null);
  };

  return (
    <ul className="todo-list">
      {todos.length === 0 && <li className="empty">No todos found</li>}

      {todos.map((t) => {
        const isEditing = editingId === t.id;
        return (
          <li key={t.id} className={`todo-item ${t.completed ? "done" : ""}`}>
            {isEditing ? (
              <>
                <input
                  className="edit-input"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") saveEdit(t.id);
                    if (e.key === "Escape") setEditingId(null);
                  }}
                />
                <div className="item-actions">
                  <button onClick={() => saveEdit(t.id)} className="save">Save</button>
                  <button onClick={() => setEditingId(null)} className="cancel">Cancel</button>
                </div>
              </>
            ) : (
              <>
                <label className="left">
                  <input
                    type="checkbox"
                    checked={t.completed}
                    onChange={() => onToggle(t.id)}
                    aria-label={`Mark ${t.text} as completed`}
                  />
                  <span className="text">{t.text}</span>
                </label>

                <div className="item-actions">
                  <button onClick={() => startEdit(t)} className="edit">Edit</button>
                  <button onClick={() => onDelete(t.id)} className="delete">Delete</button>
                </div>
              </>
            )}
          </li>
        );
      })}
    </ul>
  );
}
