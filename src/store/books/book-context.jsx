/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useReducer } from "react";
import * as bookService from "../../services/bookService.js";
import { bookReducer } from "./book-reducer.jsx";

export const BookContext = createContext({
  books: [],
  isFetching: false,
  isMutating: false,
  error: null,
  addBook: async () => {},
  deleteBook: () => {},
  editBook: async () => {},
});

function BookContextProvider({ children }) {
  const [booksState, booksDispatch] = useReducer(bookReducer, {
    books: [],
    isFetching: false,
    isMutating: false,
    error: null,
  });

  useEffect(() => {
    async function loadBooks() {
      try {
        booksDispatch({ type: "FETCH_START" });
        const books = await bookService.getBooks();
        booksDispatch({ type: "FETCH_SUCCESS", payload: books });
      } catch (error) {
        booksDispatch({
          type: "FETCH_ERROR",
          payload: "Erro ao carregar livros",
        });
      }
    }

    loadBooks();
  }, []);

  async function handleAddBook(book) {
    booksDispatch({ type: "MUTATION_START" });

    try {
      const newBook = await bookService.addBook(book);
      booksDispatch({ type: "ADD_BOOK", payload: newBook });
      return true;
    } catch (error) {
      booksDispatch({
        type: "MUTATION_ERROR",
        payload: "Erro ao adicionar livro",
      });
      return false;
    } finally {
      booksDispatch({ type: "MUTATING_END" });
    }
  }

  async function handleDeleteBook(id) {
    try {
      booksDispatch({ type: "MUTATION_START" });
      await bookService.deleteBook(id);
      booksDispatch({ type: "DELETE_BOOK", payload: id });
    } catch (error) {
      booksDispatch({
        type: "MUTATION_ERROR",
        payload: "Erro ao remover livro",
      });
    }
  }

  async function handleEditBook(bookId, bookUpdate) {
    booksDispatch({ type: "MUTATION_START" });

    try {
      const updatedBook = await bookService.editBook(bookId, bookUpdate);
      booksDispatch({ type: "EDIT_BOOK", payload: updatedBook });
      return true;
    } catch (error) {
      booksDispatch({
        type: "MUTATION_ERROR",
        payload: "Erro ao editar livro",
      });
      return false;
    } finally {
      booksDispatch({ type: "MUTATING_END" });
    }
  }

  const ctxValue = {
    books: booksState.books,
    isFetching: booksState.isFetching,
    isMutating: booksState.isMutating,
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
