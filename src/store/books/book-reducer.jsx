export function bookReducer(state, action) {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "SET_BOOKS":
      return {
        ...state,
        books: action.payload,
        loading: false,
      };
    case "ADD_BOOK":
      return {
        ...state,
        books: [...state.books, action.payload],
        loading: false,
      };
    case "DELETE_BOOK":
      return {
        ...state,
        books: state.books.filter((book) => book.id !== action.payload),
        loading: false,
      };
    case "EDIT_BOOK":
      return {
        ...state,
        books: state.books.map((book) =>
          book.id === action.payload.id ? action.payload : book,
        ),
        loading: false,
      };

    default:
      return state;
  }
}
