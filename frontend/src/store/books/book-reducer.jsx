export function bookReducer(state, action) {
  switch (action.type) {
    case "FETCH_START":
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        books: action.payload,
        isFetching: false,
      };
    case "FETCH_ERROR":
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    case "MUTATION_START":
      return {
        ...state,
        isMutating: true,
        error: null,
      };
    case "MUTATING_END":
      return {
        ...state,
        isMutating: false,
      };
    case "MUTATION_ERROR":
      return {
        ...state,
        isMutating: false,
        error: action.payload,
      };
    case "ADD_BOOK":
      return {
        ...state,
        books: [...state.books, action.payload],
        isMutating: false,
      };
    case "DELETE_BOOK":
      return {
        ...state,
        books: state.books.filter((book) => book.id !== action.payload),
        isMutating: false,
      };
    case "EDIT_BOOK":
      return {
        ...state,
        books: state.books.map((book) =>
          book.id === action.payload.id ? action.payload : book,
        ),
        isMutating: false,
      };
    default:
      return state;
  }
}
