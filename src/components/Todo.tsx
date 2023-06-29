import { useEffect, useRef, useState } from "react";
import {
  type OnHandleUpdateTitle,
  type OnChangeTodo,
  type OnRemoveTodo,
  type Todo as TodoType,
} from "../types";

interface Props extends TodoType {
  onRemoveTodo: OnRemoveTodo;
  onChangeTodo: OnChangeTodo;
  setIsEditing: (id: string) => void;
  onUpdateTitle: OnHandleUpdateTitle;
  isEditing: string;
}

export const Todo: React.FC<Props> = ({
  id,
  title,
  completed,
  onRemoveTodo,
  onChangeTodo,
  onUpdateTitle,
  setIsEditing,
  isEditing,
}) => {
  const [editedTitle, setEditedTitle] = useState(title);
  const inputEditTitle = useRef<HTMLInputElement>(null);

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      setEditedTitle(editedTitle.trim());

      if (editedTitle !== title) {
        onUpdateTitle({ id, title: editedTitle });
      }
      setIsEditing("");
    }
  };

  useEffect(() => {
    inputEditTitle.current?.focus();
  }, [isEditing]);

  return (
    <>
      <div className="view">
        <input
          type="checkbox"
          checked={completed}
          className="toggle"
          onChange={(e) => {
            onChangeTodo(id, e.target.checked);
          }}
        />
        <label>{title}</label>
        <button
          className="destroy"
          onClick={() => {
            onRemoveTodo(id);
          }}
        />
      </div>
      <input
        className="edit"
        value={editedTitle}
        onKeyDown={handleKeyDown}
        onChange={(e) => {
          setEditedTitle(e.target.value);
        }}
        onBlur={() => {
          setIsEditing("");
        }}
        ref={inputEditTitle}
      />
    </>
  );
};
