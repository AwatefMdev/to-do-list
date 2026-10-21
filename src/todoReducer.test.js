import { describe, it, expect } from 'vitest';
import { todoReducer, FILTERS } from './todoReducer';

const base = [
  { id: '1', text: 'Learn React', done: false },
  { id: '2', text: 'Write tests', done: true },
];

describe('todoReducer', () => {
  it('adds a trimmed todo', () => {
    const next = todoReducer([], { type: 'add', text: '  Buy milk ', id: 'x' });
    expect(next).toEqual([{ id: 'x', text: 'Buy milk', done: false }]);
  });

  it('ignores empty todos', () => {
    expect(todoReducer(base, { type: 'add', text: '   ' })).toBe(base);
  });

  it('toggles a todo', () => {
    expect(todoReducer(base, { type: 'toggle', id: '1' })[0].done).toBe(true);
  });

  it('edits a todo, and deletes it when the new text is empty', () => {
    expect(todoReducer(base, { type: 'edit', id: '1', text: 'Learn Vite' })[0].text).toBe('Learn Vite');
    expect(todoReducer(base, { type: 'edit', id: '1', text: '' })).toHaveLength(1);
  });

  it('deletes and clears completed todos', () => {
    expect(todoReducer(base, { type: 'delete', id: '1' })).toHaveLength(1);
    expect(todoReducer(base, { type: 'clearCompleted' })).toEqual([base[0]]);
  });

  it('filters todos', () => {
    expect(base.filter(FILTERS.active)).toHaveLength(1);
    expect(base.filter(FILTERS.completed)).toHaveLength(1);
    expect(base.filter(FILTERS.all)).toHaveLength(2);
  });
});
