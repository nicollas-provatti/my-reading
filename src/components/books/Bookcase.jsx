import { useBooks } from "../../store/books/use-books";
import Book from "./Book";

function Bookcase() {
  const { books, isFetching, error } = useBooks();

  if (isFetching) return <p className="text-center">Carregando...</p>;
  if (error) return <p className="text-center">{error}</p>

  return (
    <div className="grid grid-cols-1 gap-8 p-4 sm:grid-cols-2 lg:grid-cols-4">
      {books.length > 0 ? (
        books.map((book) => <Book key={book.id} book={book} filter />)
      ) : (
        <p>Você ainda não adicionou nenhum livro.</p>
      )}
    </div>
  );
}

export default Bookcase;
