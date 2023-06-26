import { type TODO_FILTERS } from "./consts";

export interface Todo {
  id: TodoId;
  title: string;
  completed: TodoCompleted;
}

type TodoId = string;
// creates an object type
type Todotitle = Pick<Todo, title>;
type TodoCompleted = boolean;

export type ListOfTodos = Todo[];

export type OnRemoveTodo = (id: TodoId) => void;
export type OnChangeTodo = (id: TodoId, completed: TodoCompleted) => void;

export type FilterValue = (typeof TODO_FILTERS)[keyof typeof TODO_FILTERS];
