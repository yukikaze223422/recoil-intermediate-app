import React, { memo } from "react";
import "../App.css";
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import {
  todoIdState,
  todoTitleState,
  todoDetailState,
  todoEditState,
  todoListState,
  filteredTodoListState,
  radioState,
} from "../atoms/todoInputState";

export const InputTodo = memo(() => {
  const [todoId, setTodoId] = useRecoilState(todoIdState);
  const [todoTitle, setTodoTitle] = useRecoilState(todoTitleState);
  const [todoDetail, setTodoDetail] = useRecoilState(todoDetailState);
  const [todoEdit, setTodoEdit] = useRecoilState(todoEditState);
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const setFilteredTodoList = useSetRecoilState(filteredTodoListState);
  const radio = useRecoilValue(radioState);

  //入力した値（タイトル、詳細）をTODOリストに追加
  const handleClickTodo = () => {
    setTodoId(todoId + 1);
    const newTodo = [
      ...todoList,
      {
        id: todoId + 1,
        title: todoTitle,
        detail: todoDetail,
        status: "not",
      },
    ];
    setTodoList(newTodo);
    setTodoTitle("");
    setTodoDetail("");
  };

  //編集をキャンセル
  const handleClickCancel = () => {
    setTodoEdit(!todoEdit);
    setTodoTitle("");
    setTodoDetail("");
  };

  //選択したリストを入力した値（タイトル、詳細）に更新
  const handleClickEditComplete = (e) => {
    setTodoTitle(e.target.value);
    setTodoDetail(e.target.value);
    //入力した値(タイトル、詳細)に応じてTODOリストを更新
    setTodoList((prevState) =>
      prevState.map((obj, index) =>
        obj.id === todoList[index].id
          ? {
              id: obj.id,
              title: todoTitle,
              detail: todoDetail,
              status: obj.status,
            }
          : obj
      )
    );
    if (radio === "not" && "start" && "complete") {
      const filterTodo = todoList.filter(
        (todo, index) => todo.status === todoList[index].status
      );
      setFilteredTodoList(filterTodo);
      console.log("aaa");
    }
    setTodoEdit(!todoEdit);
    setTodoTitle("");
    setTodoDetail("");
  };

  //タイトルと詳細が両方入力された場合のみTRUEで送信クリック可
  const submitpattern = (todoTitle, todoDetail) => {
    if (!todoTitle || !todoDetail) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div>
      {!todoEdit ? (
        <div className="inputTodoContainer">
          <h2>TODO入力</h2>
          <label>
            <p>タイトル</p>
            <input
              placeholder="タイトルを入力"
              value={todoTitle}
              onChange={(e) => setTodoTitle(e.target.value)}
            />
          </label>
          <label>
            <p>詳細</p>
            <textarea
              placeholder="詳細を入力"
              cols="30"
              rows="10"
              value={todoDetail}
              onChange={(e) => setTodoDetail(e.target.value)}
            />
          </label>
          <button
            className="submitButton"
            type="button"
            disabled={submitpattern(todoTitle, todoDetail)}
            onClick={handleClickTodo}
          >
            送信
          </button>
        </div>
      ) : (
        <div className="inputTodoContainer">
          <h2>TODO編集</h2>
          <label>
            <p>タイトル</p>
            <input
              placeholder="タイトルを入力"
              value={todoTitle}
              onChange={(e) => setTodoTitle(e.target.value)}
            />
          </label>
          <label>
            <p>詳細</p>
            <textarea
              placeholder="詳細を入力"
              value={todoDetail}
              onChange={(e) => setTodoDetail(e.target.value)}
            />
          </label>
          <button
            className="submitButton"
            type="button"
            disabled={submitpattern(todoTitle, todoDetail)}
            onClick={(e) => handleClickEditComplete(e)}
          >
            決定
          </button>
          <button type="button" onClick={() => handleClickCancel()}>
            キャンセル
          </button>
        </div>
      )}
    </div>
  );
});
