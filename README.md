# ✅ To-Do List

A clean, accessible to-do app built with **React** and **Vite**.

**Live demo:** https://awatefmdev.github.io/to-do-list/

## Features

- Add, edit (double-click or ✏️), complete and delete tasks
- Filter by **All / Active / Completed**
- "Clear completed" and a remaining-tasks counter
- Tasks are saved in `localStorage`, so they survive a page refresh
- Light and dark mode (follows your system setting)
- Keyboard friendly: <kbd>Enter</kbd> to save an edit, <kbd>Esc</kbd> to cancel

## Tech

- React 18 (`useReducer` + a custom `useLocalStorageReducer` hook)
- Vite
- Vitest for unit tests
- GitHub Actions to test and deploy to GitHub Pages

## Getting started

```bash
npm install
npm run dev     # start the dev server
npm test        # run unit tests
npm run build   # production build in dist/
```

## Project structure

```
src/
├── App.jsx                    # main UI: form, filters, list, footer
├── components/TodoItem.jsx    # one task (view / edit mode)
├── todoReducer.js             # all state transitions (pure, tested)
├── todoReducer.test.js
├── useLocalStorageReducer.js  # useReducer + localStorage persistence
└── App.css
```

## Deployment

Every push to `main` runs the tests, builds the app and deploys it to GitHub Pages
(see `.github/workflows/deploy.yml`). In the repo settings, set
**Pages → Source** to **GitHub Actions** once.
