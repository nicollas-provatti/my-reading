import { useBooks } from "../store/books/use-books";
import Book from "./books/Book";

const statusColors = {
  concluido: "text-green-950 bg-green-100",
  andamento: "text-indigo-950 bg-indigo-100",
  fila: "text-amber-950 bg-amber-100",
  proxima: "text-blue-950 bg-blue-100",
  abandonado: "text-red-950 bg-red-100",
};

function Card({ text, books, property }) {
  const titleClasses = "self-start px-2 rounded-md " + statusColors[property];

  return (
    <div className="flex flex-col gap-4 pb-8 border-b border-gray-200 last:border-b-0">
      <h2 className={titleClasses}>{text}</h2>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {books.map((book) => (
          <Book key={book.id} book={book}></Book>
        ))}
      </div>
    </div>
  );
}

function ReadingStatus() {
  const { books } = useBooks();

  const completed = books.filter((book) => book.status[1] === "concluido");
  const inProgress = books.filter((book) => book.status[1] === "andamento");
  const queue = books.filter((book) => book.status[1] === "fila");
  const next = books.filter((book) => book.status[1] === "proxima");
  const abandoned = books.filter((book) => book.status[1] === "abandonado");

  return (
    <div className="flex flex-col gap-8 p-4">
      <Card text="Em andamento" books={inProgress} property="andamento" />
      <Card text="Próxima(s) leitura(s)" books={next} property="proxima" />
      <Card text="Na fila" books={queue} property="fila" />
      <Card text="Concluídos" books={completed} property="concluido" />
      <Card text="Abandonados" books={abandoned} property="abandonado" />
    </div>
  );
}

export default ReadingStatus;
