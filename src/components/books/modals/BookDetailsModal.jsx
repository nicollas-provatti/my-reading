import { IoMdClose } from "react-icons/io";
import Modal from "../../UI/Modal";

const statusStyles = {
  concluido: "text-green-950 bg-green-100",
  andamento: "text-indigo-950 bg-indigo-100",
  fila: "text-amber-950 bg-amber-100",
  proxima: "text-blue-950 bg-blue-100",
  abandonado: "text-red-950 bg-red-100",
};

function formatDate(date) {
  if (!date) return "";
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
}

function BookDetailsModal({ book, onClose }) {
  const {
    cover,
    name,
    author,
    genres,
    pages,
    summary,
    status,
    startDate,
    endDate,
    assessment,
  } = book;

  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = formatDate(endDate);

  return (
    <Modal onClose={onClose}>
      {({ close }) => {
        return (
          <>
            <div className="flex justify-between items-center border-b border-zinc-300 pb-2">
              <h2 className="font-semibold text-lg">Detalhes do livro</h2>
              <button
                className="self-end p-1 rounded-full text-white bg-red-200 cursor-pointer transition-colors duration-200 hover:bg-red-300"
                onClick={close}
              >
                <IoMdClose />
              </button>
            </div>
            <div>
              <div className="max-w-78 m-auto">
                <img src={cover} alt={name} className="w-full" />
              </div>
              <div className="flex flex-col gap-4">
                <h1 className="border-t border-zinc-300 pt-1 font-semibold text-xl">
                  {name}
                </h1>
                <p>
                  <strong className="font-semibold">Autor: </strong>
                  {author}
                </p>
                <ul className="flex gap-2">
                  <strong className="font-semibold">Gêneros: </strong>
                  {genres.map((gender) => (
                    <li
                      className="px-2 py-1 rounded-md text-xs text-zinc-800 bg-zinc-200"
                      key={gender}
                    >
                      {gender}
                    </li>
                  ))}
                </ul>
                <p>
                  <strong className="font-semibold">Número de páginas: </strong>
                  {pages}
                </p>
                <p>
                  <strong className="font-semibold">Resumo: </strong>"{summary}"
                </p>
                <p>
                  <strong className="font-semibold">Status: </strong>{" "}
                  <span
                    className={`px-2 py-1 rounded-md text-sm ${statusStyles[status[1]]}`}
                  >
                    {status[0]}
                  </span>
                </p>
                {formattedStartDate && (
                  <p>
                    <strong className="font-semibold">Data de início: </strong>
                    {formattedStartDate}
                  </p>
                )}

                {formattedEndDate && (
                  <p>
                    <strong className="font-semibold">Data de fim: </strong>
                    {formattedEndDate}
                  </p>
                )}

                {assessment !== null && assessment !== 0 && (
                  <p>
                    <strong className="font-semibold">Avaliação: </strong>
                    {"⭐".repeat(assessment)}
                  </p>
                )}
              </div>
            </div>
          </>
        );
      }}
    </Modal>
  );
}

export default BookDetailsModal;
