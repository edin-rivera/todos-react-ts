import "./App.css";
import { Todos } from "./components/Todos";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { useTodos } from "./hooks/useTodos";

const App = (): JSX.Element => {
  const {
    handleRemove,
    handleChange,
    handleCreate,
    handleFilterChange,
    handleClearComplete,
    handleUpdateTitle,
    filteredTodos,
    activeCount,
    completedCount,
    filterSelected,
  } = useTodos();

  return (
    <div className="todoapp">
      <Header onAddTodo={handleCreate} />
      <Todos
        todos={filteredTodos}
        onRemoveTodo={handleRemove}
        onChangeTodo={handleChange}
        onUpdateTitle={handleUpdateTitle}
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
