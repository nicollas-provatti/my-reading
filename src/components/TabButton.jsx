import { useContext } from "react";
import { FilterContext } from "../store/filter-context";

function Button({ filter: selectedFilter, children }) {
  const { filter, changeFilter } = useContext(FilterContext);

  const isActive = selectedFilter === filter;

  const classesButton = `
    px-4 py-2 rounded-full font-semibold text-sm cursor-pointer 
    transition-colors duration-300 sm:text-lg 
    ${isActive ? "text-black/80 bg-zinc-200" : "text-zinc-500 hover:bg-zinc-100"}`;

  return (
    <button
      className={classesButton}
      onClick={() => changeFilter(selectedFilter)}
    >
      {children}
    </button>
  );
}

export default Button;
