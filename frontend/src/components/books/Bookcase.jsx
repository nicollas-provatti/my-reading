import { useBooks } from "../../store/books/use-books";
import Book from "./Book";
import Spinner from "../UI/Spinner";
import Error from "../UI/Error";

function Bookcase() {
  const { books, isFetching, error } = useBooks();

  if (isFetching) return <Spinner text="Carregando livros..." />;
  if (error) return <Error error={error}/>

  return (
    <div className="grid grid-cols-1 gap-8 p-4 sm:grid-cols-2 lg:grid-cols-4">
      {books.length > 0 ? (
        books.map((book) => <Book key={book.id} book={book} filter />)
      ) : (
        <p className="text-center sm:col-span-2 lg:col-span-4">Você ainda não adicionou nenhum livro.</p>
      )}
    </div>
  );
}

export default Bookcase;
