import { useState } from "react";
import {
  type Todotitle,
  type FilterValue,
  type ListOfTodos,
  type OnChangeTodo,
  type OnRemoveTodo,
} from "../types";
import { TODO_FILTERS } from "../consts";

interface UseTodos {
  handleRemove: (id: string) => void;
  handleChange: (id: string, completed: boolean) => void;
  handleCreate: ({ title }: Todotitle) => void;
  handleFilterChange: (filter: FilterValue) => void;
  handleClearComplete: () => void;
  filteredTodos: ListOfTodos;
  activeCount: number;
  completedCount: number;
  filterSelected: FilterValue;
}

export const useTodos = ({
  mockTodos,
}: {
  mockTodos: ListOfTodos;
}): UseTodos => {
  const [todos, setTodos] = useState(mockTodos);
  const [filterSelected, setFilterSelected] = useState<FilterValue>(
    TODO_FILTERS.ALL
  );

  const handleRemove: OnRemoveTodo = (id) => {
    const newTodos = todos.filter((t) => t.id !== id);
    setTodos(newTodos);
  };

  const handleChange: OnChangeTodo = (id, completed) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed,
        };
      } else {
        return todo;
      }
    });
    setTodos(newTodos);
  };

  const handleCreate = ({ title }: Todotitle): void => {
    const newTodo = {
      id: crypto.randomUUID(),
      title,
      completed: false,
    };
    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
  };

  const handleFilterChange = (filter: FilterValue): void => {
    setFilterSelected(filter);
  };

  const handleClearComplete = (): void => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed;
    if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed;
    return todo;
  });

  const activeCount = todos.filter((t) => !t.completed).length;
  const completedCount = todos.length - activeCount;

  return {
    handleRemove,
    handleChange,
    handleCreate,
    handleFilterChange,
    handleClearComplete,
    filteredTodos,
    activeCount,
    completedCount,
    filterSelected,
  };
};
