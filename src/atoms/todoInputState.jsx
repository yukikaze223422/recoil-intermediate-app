import { atom, selector } from "recoil";

export const todoIdState = atom({
  key: "todoIdState",
  default: 0,
});

export const todoTitleState = atom({
  key: "todoTitleState",
  default: "",
});

export const todoDetailState = atom({
  key: "todoDetailState",
  default: "",
});

export const todoEditState = atom({
  key: "todoEditState",
  default: false,
});

export const todoListState = atom({
  key: "toDoListState",
  default: [],
});

export const filteredTodoListState = atom({
  key: "filteredTodoListState",
  default: [],
});
