import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Todo } from "../../lib/type";

interface TodoState {
  todos: Todo[];
}
const initialState: TodoState = {
  todos: [],
} satisfies TodoState as TodoState;

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    editTodo: (
      state,
      action: PayloadAction<{ id: string; data: Partial<Todo> }>
    ) => {
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, ...action.payload.data }
          : todo
      );
    },
  },
});

export const { addTodo, deleteTodo, editTodo } = todoSlice.actions;

export const todoReducer = todoSlice.reducer;
