import { type FilterValue } from "../types";
import { Filters } from "./Filters";

interface Props {
  filterSelected: FilterValue;
  handleFilterChange: (filter: FilterValue) => void;
  handleClearComplete: () => void;
  completedCount: number;
  activeCount: number;
}

export const Footer: React.FC<Props> = ({
  filterSelected,
  handleFilterChange,
  handleClearComplete,
  completedCount,
  activeCount,
}) => {
  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{activeCount}</strong> tareas pendientes
      </span>
      <Filters
        filterSelected={filterSelected}
        onFilterChange={handleFilterChange}
      />
      {completedCount > 0 && (
        <button className="clear-completed" onClick={handleClearComplete}>
          Clear completed
        </button>
      )}
    </footer>
  );
};
