import React, { memo, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  todoIdState,
  todoTitleState,
  todoDetailState,
  todoEditState,
  todoListState,
} from "../atoms/todoInputState";

export const TodoList = memo(() => {
  const setTodoId = useSetRecoilState(todoIdState);
  const [todoTitle, setTodoTitle] = useRecoilState(todoTitleState);
  const [todoDetail, setTodoDetail] = useRecoilState(todoDetailState);
  const [todoEdit, setTodoEdit] = useRecoilState(todoEditState);
  const [todoList, setTodoList] = useRecoilState(todoListState);

  const [radio, setRadio] = useState("all");
  const [filteredTodoList, setFilteredTodoList] = useState([]);

  const handleClickDelete = (id) => {
    const copyTodos = [...todoList];
    const newTodos = copyTodos.filter((todo) => id !== todo.id);
    setTodoList(newTodos);
    setFilteredTodoList(newTodos);
  };

  const handleClickEdit = (id, title, detail) => {
    setTodoEdit(!todoEdit);
    setTodoTitle(title);
    setTodoDetail(detail);
    setTodoId(id);
  };

  const handleChange = (e) => {
    setRadio(e.target.value);
    if (e.target.value === "not") {
      const completeTodoList = [...todoList].filter(
        (todo) => todo.status === "not"
      );
      setFilteredTodoList(completeTodoList);
    } else if (e.target.value === "start") {
      const completeTodoList = [...todoList].filter(
        (todo) => todo.status === "start"
      );
      setFilteredTodoList(completeTodoList);
    } else if (e.target.value === "complete") {
      const completeTodoList = [...todoList].filter(
        (todo) => todo.status === "complete"
      );
      setFilteredTodoList(completeTodoList);
    }
    return;
  };

  const onClickSwitch = (e, id, title, detail) => {
    console.log(e.target.value);
    setTodoList((prevState) =>
      prevState.map((obj) =>
        obj.id === todoList[id - 1].id
          ? {
              id: obj.id,
              title: title,
              detail: detail,
              status: e.target.value,
            }
          : obj
      )
    );
    setFilteredTodoList(todoList);
    const newTodos = filteredTodoList.filter(
      (todo) => todo.status !== e.target.value
    );
    setFilteredTodoList(newTodos);
  };

  return (
    <div className="todoListContainer">
      <label>
        <input
          type="radio"
          value="all"
          checked={radio === "all"}
          onChange={(e) => handleChange(e)}
        />
        すべて
      </label>

      <label>
        <input
          type="radio"
          value="not"
          checked={radio === "not"}
          onChange={(e) => handleChange(e)}
        />
        未着手
      </label>

      <label>
        <input
          type="radio"
          value="start"
          checked={radio === "start"}
          onChange={(e) => handleChange(e)}
        />
        進行中
      </label>

      <label>
        <input
          type="radio"
          value="complete"
          checked={radio === "complete"}
          onChange={(e) => handleChange(e)}
        />
        完了
      </label>
      <h2 className="todoListTitle">TODOリスト</h2>
      {radio === "all" ? (
        <ul>
          {todoList.map((list, index) => {
            return (
              <li key={list.id}>
                <p>
                  {index + 1}:{list.title}
                </p>
                <p>{list.detail}</p>
                {!todoEdit ? (
                  <>
                    <select
                      value={list.status}
                      onChange={(e) =>
                        onClickSwitch(e, list.id, list.title, list.detail)
                      }
                    >
                      <option value="not">未着手</option>
                      <option value="start">進行中</option>
                      <option value="complete">完了</option>
                    </select>
                    <button
                      className="editButton"
                      type="button"
                      onClick={() =>
                        handleClickEdit(list.id, list.title, list.detail)
                      }
                    >
                      編集
                    </button>
                    <button
                      type="button"
                      onClick={() => handleClickDelete(list.id)}
                    >
                      削除
                    </button>
                  </>
                ) : (
                  <>
                    <select value={list.status} disabled={true}>
                      <option value="not">未着手</option>
                      <option value="start">進行中</option>
                      <option value="complete">完了</option>
                    </select>
                  </>
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <ul>
          {filteredTodoList.map((list, index) => {
            return (
              <li key={list.id}>
                <p>
                  {index + 1}:{list.title}
                </p>
                <p>{list.detail}</p>
                {!todoEdit ? (
                  <>
                    <select
                      value={list.status}
                      onChange={(e) =>
                        onClickSwitch(e, list.id, list.title, list.detail)
                      }
                    >
                      <option value="not">未着手</option>
                      <option value="start">進行中</option>
                      <option value="complete">完了</option>
                    </select>
                    <button
                      className="editButton"
                      type="button"
                      onClick={() =>
                        handleClickEdit(list.id, list.title, list.detail)
                      }
                    >
                      編集
                    </button>
                    <button
                      type="button"
                      onClick={() => handleClickDelete(list.id)}
                    >
                      削除
                    </button>
                  </>
                ) : (
                  <>
                    <select value={list.status} disabled={true}>
                      <option value="not">未着手</option>
                      <option value="start">進行中</option>
                      <option value="complete">完了</option>
                    </select>
                  </>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
});
