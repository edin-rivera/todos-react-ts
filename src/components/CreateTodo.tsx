import { useState } from "react";
import { type Todotitle } from "../types";

interface Props {
  saveTodo: ({ title }: Todotitle) => void;
}

export const CreateTodo: React.FC<Props> = ({ saveTodo }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    saveTodo({ title: inputValue });
    setInputValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="new-todo"
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        placeholder="Que quieres hacer?"
        value={inputValue}
      />
    </form>
  );
};
