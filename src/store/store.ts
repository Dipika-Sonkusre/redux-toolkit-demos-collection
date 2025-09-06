import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "../slice/Counter/counterSlice";
import { todoReducer } from "../slice/Todo/todoSlice";

// redux-persist imports to persist Redux state to storage (localStorage on web)
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import {
  persistReducer,
  persistStore
} from "redux-persist";

// Persist config for ONLY the `todo` slice. This keeps the counter ephemeral.
// key: unique storage key for this slice in localStorage.
// storage: which storage engine to use (localStorage for web via `redux-persist/lib/storage`).
const todoPersistConfig = {
  key: "todo",
  storage,
  // If you had a nested reducer and wanted only portions to persist, you could use:
  // whitelist: ["todos"],
};

// Wrap the slice reducer with persistReducer so it can handle REHYDRATE/PERSIST actions
const persistedTodoReducer = persistReducer(todoPersistConfig, todoReducer);

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    // Persisted slice: todo
    todo: persistedTodoReducer,
  },
});

// Persistor controls starting/stopping persistence and triggers rehydration
export const persistor = persistStore(store);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
