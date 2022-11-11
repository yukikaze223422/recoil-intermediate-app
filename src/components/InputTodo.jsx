import React from "react";
import "../App.css";

export const InputTodo = (props) => {
  const {
    todoId,
    setTodoId,
    todoTitle,
    setTodoTitle,
    todoDetail,
    setTodoDetail,
    todoList,
    setTodoList,
    todoEdit,
    setTodoEdit,
  } = props;

  const handleClickTodo = () => {
    setTodoId(todoId + 1);
    const newTodo = [
      ...todoList,
      {
        id: todoId + 1,
        title: todoTitle,
        detail: todoDetail,
        status: "未着手",
      },
    ];
    setTodoList(newTodo);
    setTodoTitle("");
    setTodoDetail("");
  };

  const handleClickCancel = () => {
    setTodoEdit(!todoEdit);
    setTodoTitle("");
    setTodoDetail("");
  };

  const handleClickEditComplete = (id, e) => {
    setTodoTitle(e.target.value);
    setTodoDetail(e.target.value);
    todoList[id - 1].title = todoTitle;
    todoList[id - 1].detail = todoDetail;
    setTodoEdit(!todoEdit);
    setTodoTitle("");
    setTodoDetail("");
  };

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
            onClick={(e) => handleClickEditComplete(todoId, e)}
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
};
