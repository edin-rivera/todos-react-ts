import { type Todotitle } from "../types";
import { CreateTodo } from "./CreateTodo";

interface Props {
  onAddTodo: ({ title }: Todotitle) => void;
}

export const Header: React.FC<Props> = ({ onAddTodo }) => {
  return (
    <header className="header">
      <h1>Todo List</h1>
      <CreateTodo saveTodo={onAddTodo} />
    </header>
  );
};
