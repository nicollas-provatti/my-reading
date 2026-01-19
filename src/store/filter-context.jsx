import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const FilterContext = createContext({
  filter: "",
  changeFilter: () => {},
});

function FilterContextProvider({ children }) {
  const [filter, setFilter] = useState("bookcase");

  function handleChangeFilter(selectedFilter) {
    /* console.log(selectedFilter); */
    setFilter(selectedFilter);
  }

  const ctxValue = {
    filter: filter,
    changeFilter: handleChangeFilter,
  };

  return <FilterContext.Provider value={ctxValue}>{children}</FilterContext.Provider>;
}

export default FilterContextProvider;
