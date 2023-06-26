import { TODO_FILTERS } from "../consts";
import { type FilterValue } from "../types";

const FILTERS_BUTTONS = {
  [TODO_FILTERS.ALL]: { literal: "All", href: `/?filter=${TODO_FILTERS.ALL}` },
  [TODO_FILTERS.ACTIVE]: {
    literal: "Active",
    href: `/?filter=${TODO_FILTERS.ACTIVE}`,
  },
  [TODO_FILTERS.COMPLETED]: {
    literal: "Completed",
    href: `/?filter=${TODO_FILTERS.COMPLETED}`,
  },
} as const;

interface Props {
  filterSelected: (typeof TODO_FILTERS)[keyof typeof TODO_FILTERS];
  onFilterChange: (filter: FilterValue) => void;
}

export const Filters: React.FC<Props> = ({
  filterSelected,
  onFilterChange,
}) => {
  return (
    <ul className="filters">
      {Object.entries(FILTERS_BUTTONS).map(([key, { literal, href }]) => (
        <li key={key}>
          <a
            className={key === filterSelected ? "selected" : ""}
            href={href}
            onClick={(e) => {
              e.preventDefault();
              onFilterChange(key as FilterValue);
            }}
          >
            {literal}
          </a>
        </li>
      ))}
    </ul>
  );
};
