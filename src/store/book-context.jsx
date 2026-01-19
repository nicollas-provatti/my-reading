/* eslint-disable react-refresh/only-export-components */
import { createContext, useReducer } from "react";
import books from "../data/books.json";

export const BookContext = createContext({
  books: [],
  addBook: () => {},
  deleteBook: () => {},
  editBook: () => {},
});

function bookReducer(state, action) {
  switch (action.type) {
    case "ADD_BOOK":
      return {
        ...state,
        books: [...state.books, action.payload],
      };
    case "DELETE_BOOK":
      return {
        ...state,
        books: state.books.filter((book) => book.id !== action.payload),
      };
    case "EDIT_BOOK":
      return {
        ...state,
        books: state.books.map((book) =>
          book.id === action.payload.id ? action.payload : book,
        ),
      };
    default:
      return state;
  }
}

function BookContextProvider({ children }) {
  const [booksState, booksDispatch] = useReducer(bookReducer, {
    books: books,
  });

  function handleAddBook(book) {
    const newBook = {
      ...book,
      id: crypto.randomUUID(),
    };

    booksDispatch({ type: "ADD_BOOK", payload: newBook });
  }

  function handleDeleteBook(id) {
    booksDispatch({ type: "DELETE_BOOK", payload: id });
  }

  function handleEditBook(bookUpdate) {
    booksDispatch({ type: "EDIT_BOOK", payload: bookUpdate });
  }

  const ctxValue = {
    books: booksState.books,
    addBook: handleAddBook,
    deleteBook: handleDeleteBook,
    editBook: handleEditBook,
  };

  return (
    <BookContext.Provider value={ctxValue}>{children}</BookContext.Provider>
  );
}

export default BookContextProvider;
