import Bookcase from "./books/Bookcase";
import ReadingStatus from "./ReadingStatus";
import TabButtons from "./TabButtons";
import { FilterContext } from "../store/filter-context";
import { useContext } from "react";
import BookContextProvider from "../store/book-context";

function Main() {
  const { filter } = useContext(FilterContext);

  return (
    <main className="my-5 max-w-7xl px-6 md:mx-auto">
      <BookContextProvider>
        <TabButtons />
        {filter === "bookcase" && <Bookcase />}
        {filter === "readingStatus" && <ReadingStatus />}
      </BookContextProvider>
    </main>
  );
}

export default Main;
