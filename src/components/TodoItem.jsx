import { useState } from 'react';

export default function TodoItem({ todo, dispatch }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);

  const save = () => {
    dispatch({ type: 'edit', id: todo.id, text: draft });
    setEditing(false);
  };

  return (
    <li className={`todo ${todo.done ? 'todo--done' : ''}`}>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => dispatch({ type: 'toggle', id: todo.id })}
        aria-label={`Mark "${todo.text}" as ${todo.done ? 'not done' : 'done'}`}
      />

      {editing ? (
        <input
          className="todo__edit"
          value={draft}
          autoFocus
          onChange={(e) => setDraft(e.target.value)}
          onBlur={save}
          onKeyDown={(e) => {
            if (e.key === 'Enter') save();
            if (e.key === 'Escape') {
              setDraft(todo.text);
              setEditing(false);
            }
          }}
          aria-label="Edit task"
        />
      ) : (
        <span className="todo__text" onDoubleClick={() => setEditing(true)}>
          {todo.text}
        </span>
      )}

      <button className="icon-btn" onClick={() => setEditing(true)} aria-label="Edit task">✏️</button>
      <button
        className="icon-btn"
        onClick={() => dispatch({ type: 'delete', id: todo.id })}
        aria-label="Delete task"
      >
        🗑️
      </button>
    </li>
  );
}
