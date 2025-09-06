import { useState } from "react";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { deleteTodo, editTodo } from "../../slice/Todo/todoSlice";

import type { Todo } from "../../lib/type";

export default function TodoDetails() {
  const todos = useAppSelector((state) => state.todo.todos);
  const dispatch = useAppDispatch();

  const [editId, setEditId] = useState<string | null>(null);
  const [editedItem, setEditedItem] = useState("");

  const handleDeleteTodoItem = (id: string) => {
    dispatch(deleteTodo(id));
    console.log("Deleted successfully!");
  };

  const handleEditTodoItem = (todo: Todo) => {
    setEditId(todo.id);
    setEditedItem(todo.item);
  };

  const handleSaveTodoItem = () => {
    if (!editId) return;

    dispatch(
      editTodo({
        id: editId,
        data: { item: editedItem }, //data expect object
      })
    );
    console.log("Edited Successfully!");
    setEditId(null);
    setEditedItem("");
  };

  const handleCancelTodoItem = () => {
    setEditId(null);
    setEditedItem("");
  };

  return (
    <div className="todo-details-container">
      {todos.length === 0 && <p>No Todo Item!</p>}
      {todos.map((todo) => (
        <div className="todo-item-container" key={todo.id}>
          {editId === todo.id ? (
            <input
              type="text"
              value={editedItem}
              onChange={(e) => setEditedItem(e.target.value)}
            />
          ) : (
            <p>{todo.item}</p>
          )}
          {editId === todo.id ? (
            <div>
              <button onClick={() => handleSaveTodoItem()}>Save</button>
              <button onClick={() => handleCancelTodoItem()}>Cancel</button>
            </div>
          ) : (
            <div>
              <button onClick={() => handleEditTodoItem(todo)}>Edit</button>
              <button onClick={() => handleDeleteTodoItem(todo.id)}>
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
