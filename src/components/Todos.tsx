import {
  type ListOfTodos,
  type OnRemoveTodo,
  type OnChangeTodo,
} from "../types";
import { Todo } from "./Todo";

interface Props {
  todos: ListOfTodos;
  onRemoveTodo: OnRemoveTodo;
  onChangeTodo: OnChangeTodo;
}

export const Todos: React.FC<Props> = ({
  todos,
  onRemoveTodo,
  onChangeTodo,
}) => {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li key={todo.id} className={`${todo.completed ? "completed" : ""}`}>
          <Todo
            id={todo.id}
            title={todo.title}
            completed={todo.completed}
            onRemoveTodo={onRemoveTodo}
            onChangeTodo={onChangeTodo}
          />
        </li>
      ))}
    </ul>
  );
};
