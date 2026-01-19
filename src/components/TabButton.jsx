import { useContext } from "react";
import { FilterContext } from "../store/filter-context";

function Button({ filter: selectedFilter, children }) {
  const { filter, changeFilter } = useContext(FilterContext);

  let classesButton =
    "px-4 py-2 rounded-full font-semibold text-sm cursor-pointer text-zinc-500 transition-collors duration-300 hover:bg-zinc-100 sm:text-lg";

  if (selectedFilter === filter) {
    classesButton =
      "px-4 py-2 rounded-full font-semibold text-sm cursor-pointer text-black/80 bg-zinc-200 sm:text-lg";
  }

  // Obs.: tive que repetir "px-4 py-2 rounded-full font-semibold cursor-pointer", pois eu não quero o hover quando o botão estiver seleciondo.

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
