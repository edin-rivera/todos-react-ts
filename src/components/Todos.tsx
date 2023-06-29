import { useState } from "react";
import {
  type ListOfTodos,
  type OnRemoveTodo,
  type OnChangeTodo,
  type OnHandleUpdateTitle,
} from "../types";
import { Todo } from "./Todo";

interface Props {
  todos: ListOfTodos;
  onRemoveTodo: OnRemoveTodo;
  onChangeTodo: OnChangeTodo;
  onUpdateTitle: OnHandleUpdateTitle;
}

export const Todos: React.FC<Props> = ({
  todos,
  onRemoveTodo,
  onChangeTodo,
  onUpdateTitle,
}) => {
  const [isEditing, setIsEditing] = useState("");
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className={`
            ${todo.completed ? "completed" : ""}
            ${isEditing === todo.id ? "editing" : ""}
          `}
          onDoubleClick={() => {
            setIsEditing(todo.id);
          }}
        >
          <Todo
            id={todo.id}
            title={todo.title}
            completed={todo.completed}
            onRemoveTodo={onRemoveTodo}
            onChangeTodo={onChangeTodo}
            setIsEditing={setIsEditing}
            onUpdateTitle={onUpdateTitle}
            isEditing={isEditing}
          />
        </li>
      ))}
    </ul>
  );
};
