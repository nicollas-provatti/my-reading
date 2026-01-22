/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useReducer } from "react";
// import books from "../data/books.json";
import * as bookApi from "../services/bookApi.js";

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
    case "SET_BOOKS":
      return {
        ...state,
        books: action.payload,
      };
    default:
      return state;
  }
}

function BookContextProvider({ children }) {
  const [booksState, booksDispatch] = useReducer(bookReducer, {
    books: [],
  });

  useEffect(() => {
    async function loadBooks() {
      const books = await bookApi.getBooks();
      booksDispatch({ type: "SET_BOOKS", payload: books });
    }

    loadBooks();
  }, []);

  async function handleAddBook(book) {
    const newBook = await bookApi.addBook(book);
    booksDispatch({ type: "ADD_BOOK", payload: newBook });
  }

  async function handleDeleteBook(id) {
    await bookApi.deleteBook(id);
    booksDispatch({ type: "DELETE_BOOK", payload: id });
  }

  async function handleEditBook(bookUpdate) {
    const updatedBook = await bookApi.editBook(bookUpdate.id, bookUpdate);
    booksDispatch({ type: "EDIT_BOOK", payload: updatedBook });
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
