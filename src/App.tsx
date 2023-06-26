import { useState } from "react";
import "./App.css";
import { Todos } from "./components/Todos";
import {
  type OnRemoveTodo,
  type OnChangeTodo,
  type FilterValue,
  type Todotitle,
} from "./types";
import { Footer } from "./components/Footer";
import { TODO_FILTERS } from "./consts";
import { Header } from "./components/Header";

const mockTodos = [
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

const App = (): JSX.Element => {
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

  return (
    <div className="todoapp">
      <Header onAddTodo={handleCreate} />
      <Todos
        todos={filteredTodos}
        onRemoveTodo={handleRemove}
        onChangeTodo={handleChange}
      />
      <Footer
        filterSelected={filterSelected}
        handleFilterChange={handleFilterChange}
        handleClearComplete={handleClearComplete}
        completedCount={completedCount}
        activeCount={activeCount}
      />
    </div>
  );
};

export default App;
