import { useContext } from "react";
import { BookContext } from "./book-context";

export function useBooks() {
  const context = useContext(BookContext);

  if (!context) {
    throw new Error("useBooks must be used within a BookContextProvider");
  }

  return context;
}