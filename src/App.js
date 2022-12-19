import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import Todo from "./companents/Todo";
import TodoList from "./companents/TodoList";
import { v4 as uuid } from "uuid";

const LOCAL_STORAGE_KEY = "todoApp.todos";

function App() {
  const [todos, setTodos] = useState([]);
  const todoName = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function handleClearTodos() {
    const newTodos = todos.filter((todo) => !todo.complete);
  }
  function AddButton(e) {
    const name = todoName.current.value;
    if (name === "") return;
    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuid(), name: name, complete: false }];
    });
    todoName.current.value = null;
  }

  return (
    <div className="App">
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input ref={todoName} type="text" />
      <button onClick={AddButton}>Add</button>
      <button onclick={handleClearTodos}>Clear</button>
      <div>{todos.filter((todo) => !todo.complete).length}</div>
    </div>
  );
}

export default App;
