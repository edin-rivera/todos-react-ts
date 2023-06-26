import {
  type OnChangeTodo,
  type OnRemoveTodo,
  type Todo as TodoType,
} from "../types";

interface Props extends TodoType {
  onRemoveTodo: OnRemoveTodo;
  onChangeTodo: OnChangeTodo;
}

export const Todo: React.FC<Props> = ({
  id,
  title,
  completed,
  onRemoveTodo,
  onChangeTodo,
}) => {
  return (
    <div>
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
  );
};
