import { useContext } from "react";
import Book from "./Book";
import { BookContext } from "../store/book-context";

function Bookcase() {
  const { books } = useContext(BookContext);

  return (
    <div className="grid grid-cols-1 gap-8 p-4 sm:grid-cols-2 lg:grid-cols-4">
      {books.length > 0 ? (
        books.map((book) => <Book key={book.id} book={book} filter/>)
      ) : (
        <p>Você ainda não adicionou nenhum livro.</p>
      )}
    </div>
  );
}

export default Bookcase;
