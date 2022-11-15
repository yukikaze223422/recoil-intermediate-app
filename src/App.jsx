import React, { useState } from "react";
import { RecoilRoot } from "recoil";
import { TodoList } from "./components/TodoList";
import { InputTodo } from "./components/InputTodo";

function App() {
  return (
    <RecoilRoot>
      <InputTodo />
      <TodoList />
    </RecoilRoot>
  );
}

export default App;
