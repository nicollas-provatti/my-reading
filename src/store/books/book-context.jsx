/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useReducer } from "react";
import * as bookApi from "../../services/bookApi.js";
import { bookReducer } from "./book-reducer.jsx";

export const BookContext = createContext({
  books: [],
  loading: false,
  error: null,
  addBook: () => {},
  deleteBook: () => {},
  editBook: () => {},
});

function BookContextProvider({ children }) {
  const [booksState, booksDispatch] = useReducer(bookReducer, {
    books: [],
    loading: false,
    error: null,
  });

  useEffect(() => {
    async function loadBooks() {
      try {
        booksDispatch({ type: "LOADING" });
        const books = await bookApi.getBooks();
        booksDispatch({ type: "SET_BOOKS", payload: books });
      } catch (error) {
        booksDispatch({
          type: "ERROR",
          payload: "Erro ao carregar livros",
        });
      }
    }

    loadBooks();
  }, []);

  async function handleAddBook(book) {
    try {
      booksDispatch({ type: "LOADING" });
      const newBook = await bookApi.addBook(book);
      booksDispatch({ type: "ADD_BOOK", payload: newBook });
    } catch (error) {
      booksDispatch({
        type: "ERROR",
        payload: "Erro ao adicionar livro",
      });
    }
  }

  async function handleDeleteBook(id) {
    try {
      booksDispatch({ type: "LOADING" });
      await bookApi.deleteBook(id);
      booksDispatch({ type: "DELETE_BOOK", payload: id });
    } catch (error) {
      booksDispatch({
        type: "ERROR",
        payload: "Erro ao remover livro",
      });
    }
  }

  async function handleEditBook(bookUpdate) {
    try {
      booksDispatch({ type: "LOADING" });
      const updatedBook = await bookApi.editBook(bookUpdate.id, bookUpdate);
      booksDispatch({ type: "EDIT_BOOK", payload: updatedBook });
    } catch (error) {
      booksDispatch({
        type: "ERROR",
        payload: "Erro ao editar livro",
      });
    }
  }

  const ctxValue = {
    books: booksState.books,
    loading: booksState.loading,
    error: booksState.error,
    addBook: handleAddBook,
    deleteBook: handleDeleteBook,
    editBook: handleEditBook,
  };

  return (
    <BookContext.Provider value={ctxValue}>{children}</BookContext.Provider>
  );
}

export default BookContextProvider;
