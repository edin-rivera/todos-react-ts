import { useEffect, useReducer } from "react";
import {
  type OnChangeTodo,
  type FilterValue,
  type ListOfTodos,
  type OnRemoveTodo,
  type OnCreateTodo,
  type OnFilterTodo,
  type OnClearCompleted,
  type OnHandleUpdateTitle,
} from "../types";
import { TODO_FILTERS } from "../consts";
import { fetchTodos, updateTodos } from "../services/todos";

type Action =
  | { type: "INIT_TODOS"; payload: { todos: ListOfTodos } }
  | { type: "CLEAR_COMPLETED" }
  | { type: "COMPLETED"; payload: { id: string; completed: boolean } }
  | { type: "FILTER_CHANGE"; payload: { filter: FilterValue } }
  | { type: "REMOVE"; payload: { id: string } }
  | { type: "SAVE"; payload: { title: string } }
  | { type: "UPDATE_TITLE"; payload: { id: string; title: string } };

interface State {
  sync: boolean;
  todos: ListOfTodos;
  filterSelected: FilterValue;
}

export const mockTodos = [
  {
    id: "1",
    title: "todo 1",
    completed: true,
  },
  {
    id: "2",
    title: "Aprender React Server Components",
    completed: false,
  },
  {
    id: "3",
    title: "Viajar a Sogamoso",
    completed: false,
  },
];

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "INIT_TODOS": {
      const { todos } = action.payload;
      return {
        ...state,
        sync: false,
        todos,
      };
    }
    case "REMOVE": {
      const { id } = action.payload;
      return {
        ...state,
        sync: true,
        todos: state.todos.filter((todo) => todo.id !== id),
      };
    }
    case "CLEAR_COMPLETED": {
      return {
        ...state,
        sync: true,
        todos: state.todos.filter((todo) => !todo.completed),
      };
    }
    case "SAVE": {
      const { title } = action.payload;
      const newTodo = {
        id: crypto.randomUUID(),
        title,
        completed: false,
      };
      return {
        ...state,
        sync: true,
        todos: [...state.todos, newTodo],
      };
    }
    case "FILTER_CHANGE": {
      const { filter } = action.payload;
      return {
        ...state,
        sync: true,
        filterSelected: filter,
      };
    }
    case "COMPLETED": {
      const { id, completed } = action.payload;
      return {
        ...state,
        sync: true,
        todos: state.todos.map((todo) => {
          if (todo.id === id) {
            return {
              ...todo,
              completed,
            };
          } else {
            return todo;
          }
        }),
      };
    }
    case "UPDATE_TITLE": {
      const { id, title } = action.payload;
      return {
        ...state,
        sync: true,
        todos: state.todos.map((todo) => {
          if (todo.id === id) {
            return {
              ...todo,
              title,
            };
          } else {
            return todo;
          }
        }),
      };
    }
    default: {
      return state;
    }
  }
};

const initialState = {
  sync: false,
  todos: [],
  filterSelected: TODO_FILTERS.ALL,
};

interface UseTodos {
  handleRemove: OnRemoveTodo;
  handleChange: OnChangeTodo;
  handleCreate: OnCreateTodo;
  handleFilterChange: OnFilterTodo;
  handleClearComplete: OnClearCompleted;
  handleUpdateTitle: OnHandleUpdateTitle;
  filteredTodos: ListOfTodos;
  activeCount: number;
  completedCount: number;
  filterSelected: FilterValue;
}

export const useTodos = (): UseTodos => {
  const [{ sync, todos, filterSelected }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const handleChange: OnChangeTodo = (id, completed) => {
    dispatch({ type: "COMPLETED", payload: { id, completed } });
  };

  const handleRemove: OnRemoveTodo = (id) => {
    dispatch({ type: "REMOVE", payload: { id } });
  };

  const handleCreate: OnCreateTodo = ({ title }) => {
    dispatch({ type: "SAVE", payload: { title } });
  };

  const handleFilterChange: OnFilterTodo = (filter) => {
    dispatch({ type: "FILTER_CHANGE", payload: { filter } });
  };

  const handleClearComplete: OnClearCompleted = () => {
    dispatch({ type: "CLEAR_COMPLETED" });
  };

  const handleUpdateTitle: OnHandleUpdateTitle = ({ id, title }) => {
    dispatch({ type: "UPDATE_TITLE", payload: { id, title } });
  };

  const filteredTodos = todos.filter((todo) => {
    if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed;
    if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed;
    return todo;
  });

  const activeCount = todos.filter((t) => !t.completed).length;
  const completedCount = todos.length - activeCount;

  useEffect(() => {
    fetchTodos()
      .then((todos) => {
        dispatch({ type: "INIT_TODOS", payload: { todos } });
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    if (sync) {
      updateTodos({ todos }).catch((err) => {
        console.error(err);
      });
    }
  }, [todos, sync]);

  return {
    handleChange,
    handleRemove,
    handleCreate,
    handleFilterChange,
    handleClearComplete,
    handleUpdateTitle,
    filterSelected,
    filteredTodos,
    completedCount,
    activeCount,
  };
};
