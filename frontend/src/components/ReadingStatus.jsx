import { useBooks } from "../store/books/use-books";
import Book from "./books/Book";
import { STATUS_STYLES } from "../utils/statusStyles";

function Card({ text, books, status }) {
  const titleClasses = `self-start px-2 rounded-md ${STATUS_STYLES[status]}`;

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

  const completed = books.filter((book) => book.status === "Concluído");
  const inProgress = books.filter((book) => book.status === "Em andamento");
  const queue = books.filter((book) => book.status === "Na fila");
  const next = books.filter((book) => book.status === "Próxima");
  const abandoned = books.filter((book) => book.status === "Abandonado");

  const noBooks =
    inProgress.length === 0 &&
    next.length === 0 &&
    queue.length === 0 &&
    completed.length === 0 &&
    abandoned.length === 0;

  return (
    <div className="flex flex-col gap-8 p-4">
      {noBooks ? (
        <p className="text-center">Você ainda não adicionou nenhum livro.</p>
      ) : (
        <>
          {inProgress.length !== 0 && (
            <Card
              text="Em andamento"
              books={inProgress}
              status="Em andamento"
            />
          )}

          {next.length !== 0 && (
            <Card
              text="Próxima(s) leitura(s)"
              books={next}
              status="Próxima leitura"
            />
          )}

          {queue.length !== 0 && (
            <Card text="Na fila" books={queue} status="Na fila" />
          )}

          {completed.length !== 0 && (
            <Card text="Concluídos" books={completed} status="Conluído" />
          )}

          {abandoned.length !== 0 && (
            <Card text="Abandonado(s)" books={abandoned} status="Abandonado" />
          )}
        </>
      )}
    </div>
  );
}

export default ReadingStatus;
