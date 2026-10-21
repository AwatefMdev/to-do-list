import { useState } from 'react';
import TodoItem from './components/TodoItem.jsx';
import { todoReducer, FILTERS } from './todoReducer.js';
import { useLocalStorageReducer } from './useLocalStorageReducer.js';

export default function App() {
  const [todos, dispatch] = useLocalStorageReducer('todos', todoReducer, []);
  const [text, setText] = useState('');
  const [filter, setFilter] = useState('all');

  const visible = todos.filter(FILTERS[filter]);
  const remaining = todos.filter(FILTERS.active).length;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: 'add', text });
    setText('');
  };

  return (
    <main className="app">
      <h1>To-Do List</h1>

      <form className="add-form" onSubmit={handleSubmit}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What needs to be done?"
          aria-label="New task"
        />
        <button type="submit">Add</button>
      </form>

      <div className="filters" role="group" aria-label="Filter tasks">
        {Object.keys(FILTERS).map((name) => (
          <button
            key={name}
            className={filter === name ? 'active' : ''}
            aria-pressed={filter === name}
            onClick={() => setFilter(name)}
          >
            {name[0].toUpperCase() + name.slice(1)}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="empty">Nothing here yet 🎉</p>
      ) : (
        <ul className="todo-list">
          {visible.map((todo) => (
            <TodoItem key={todo.id} todo={todo} dispatch={dispatch} />
          ))}
        </ul>
      )}

      <footer className="footer">
        <span>{remaining} {remaining === 1 ? 'task' : 'tasks'} left</span>
        <button onClick={() => dispatch({ type: 'clearCompleted' })}>Clear completed</button>
      </footer>
    </main>
  );
}
