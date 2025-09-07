import { useState, type FormEvent } from "react";
import { useAppDispatch } from "../../store/hooks";
import { addTodo } from "../../slice/Todo/todoSlice";
import type { Todo } from "../../lib/type";

export default function AddTodo() {
  const [todoItem, setTodoItem] = useState("");
  const dispatch = useAppDispatch();

  const handleAddTodoItem = (e: FormEvent) => {
    e.preventDefault();

    if (!todoItem.trim()) return; // prevent empty todos

    const newTodoItem: Todo = {
      id: new Date().getTime().toString(),
      item: todoItem.trim(), //always trim data
    };

    dispatch(addTodo(newTodoItem));
    setTodoItem("");
  };

  return (
    <form onSubmit={handleAddTodoItem} className="add-todo-container">
      <input
        type="text"
        placeholder="Enter Item..."
        value={todoItem}
        onChange={(e) => setTodoItem(e.target.value)}
      />
      <button type="submit">Add Todo Item</button>
    </form>
  );
}
