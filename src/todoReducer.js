export const FILTERS = {
  all: () => true,
  active: (todo) => !todo.done,
  completed: (todo) => todo.done,
};

export function todoReducer(todos, action) {
  switch (action.type) {
    case 'add': {
      const text = action.text.trim();
      if (!text) return todos;
      return [...todos, { id: action.id ?? crypto.randomUUID(), text, done: false }];
    }
    case 'toggle':
      return todos.map((t) => (t.id === action.id ? { ...t, done: !t.done } : t));
    case 'edit': {
      const text = action.text.trim();
      if (!text) return todos.filter((t) => t.id !== action.id);
      return todos.map((t) => (t.id === action.id ? { ...t, text } : t));
    }
    case 'delete':
      return todos.filter((t) => t.id !== action.id);
    case 'clearCompleted':
      return todos.filter((t) => !t.done);
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}
