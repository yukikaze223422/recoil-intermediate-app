import React, { useState } from "react";

import { TodoList } from "./components/TodoList";
import { InputTodo } from "./components/InputTodo";

function App() {
  const [todoId, setTodoId] = useState(0);
  const [todoTitle, setTodoTitle] = useState("");
  const [todoDetail, setTodoDetail] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [todoEdit, setTodoEdit] = useState(false);

  return (
    <>
      <InputTodo
        todoId={todoId}
        setTodoId={setTodoId}
        todoTitle={todoTitle}
        setTodoTitle={setTodoTitle}
        todoDetail={todoDetail}
        setTodoDetail={setTodoDetail}
        todoList={todoList}
        setTodoList={setTodoList}
        todoEdit={todoEdit}
        setTodoEdit={setTodoEdit}
      />
      <TodoList
        setTodoId={setTodoId}
        setTodoTitle={setTodoTitle}
        setTodoDetail={setTodoDetail}
        todoList={todoList}
        setTodoList={setTodoList}
        todoEdit={todoEdit}
        setTodoEdit={setTodoEdit}
      />
    </>
  );
}

export default App;
