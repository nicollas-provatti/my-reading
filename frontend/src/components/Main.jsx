import Bookcase from "./books/Bookcase";
import ReadingStatus from "./ReadingStatus";
import TabButtons from "./TabButtons";
import { FilterContext } from "../store/filter-context";
import { useContext } from "react";
import BookContextProvider from "../store/books/book-context";

function Main() {
  const { filter } = useContext(FilterContext);

  return (
    <main className="flex-1 my-5 w-full max-w-7xl px-6 md:mx-auto">
      <BookContextProvider>
        <TabButtons />
        {filter === "bookcase" && <Bookcase />}
        {filter === "readingStatus" && <ReadingStatus />}
      </BookContextProvider>
    </main>
  );
}

export default Main;
