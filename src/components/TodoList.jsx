import React, { memo, useState } from "react";
import "../App.css";

export const TodoList = memo((props) => {
  const {
    setTodoTitle,
    setTodoDetail,
    setTodoId,
    todoList,
    setTodoList,
    todoEdit,
    setTodoEdit,
  } = props;

  const [radio, setRadio] = useState("all");
  const [filteredTodoList, setFilteredTodoList] = useState([]);

  const handleClickDelete = (id) => {
    const copyTodos = [...todoList];
    const newTodos = copyTodos.splice(id, 1);
    setTodoList(newTodos);
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
      const incompleteTodoList = [...todoList].filter(
        (todo) => todo.status === "not"
      );
      setFilteredTodoList(incompleteTodoList);
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

  const onClickSwitch = (e, id) => {
    if (e.target.value === "not") {
      todoList[id - 1].status = "not";
    } else if (e.target.value === "start") {
      todoList[id - 1].status = "start";
    } else if (e.target.value === "complete") {
      todoList[id - 1].status = "complete";
    }
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
          {todoList.map((list) => {
            return (
              <li key={list.id}>
                <p>
                  {list.id}:{list.title}
                </p>
                <p>{list.detail}</p>
                {!todoEdit ? (
                  <>
                    <select
                      value={todoList.status}
                      onChange={(e) => onClickSwitch(e, list.id)}
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
                  <></>
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <ul>
          {filteredTodoList.map((list) => {
            return (
              <li key={list.id}>
                <p>
                  {list.id}:{list.title}
                </p>
                <p>{list.detail}</p>
                {!todoEdit ? (
                  <>
                    <select
                      value={filteredTodoList.status}
                      onChange={(e) => onClickSwitch(e, list.id)}
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
                  <></>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
});
