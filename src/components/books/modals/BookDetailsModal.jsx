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
            <div className="flex justify-between items-center px-3 py-2 bg-white shadow-sm rounded-md">
              <h2 className="font-semibold text-lg">Detalhes do livro</h2>
              <button
                className="p-2 rounded-full text-zinc-500 bg-zinc-50 hover:bg-zinc-100 transition cursor-pointer"
                onClick={close}
              >
                <IoMdClose />
              </button>
            </div>
            <div className="grid gap-6 md:grid-cols-[220px_1fr]">
              <div className="max-w-78 m-auto">
                <img
                  src={cover}
                  alt={name}
                  className="w-full rounded-md shadow-md"
                />
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold leading-tight">{name}</h1>
                  {assessment !== null && assessment !== 0 && (
                    <p>{"⭐".repeat(assessment)}</p>
                  )}
                </div>
                <p className="text-sm text-zinc-600">
                  por <span className="font-medium">{author}</span>
                </p>
                <ul className="flex flex-wrap gap-2">
                  {genres.map((gender) => (
                    <li
                      key={gender}
                      className="px-3 py-1 rounded-full text-xs bg-zinc-100 text-zinc-700"
                    >
                      {gender}
                    </li>
                  ))}
                </ul>
                <p className="text-zinc-700 text-sm">
                  <strong className="font-medium">{pages}</strong> páginas
                </p>
                <div className="border-t border-zinc-200 pt-4">
                  <p className="text-sm leading-relaxed text-zinc-800 italic">
                    “{summary}”
                  </p>
                </div>
                <p>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[status[1]]}`}
                  >
                    {status[0]}
                  </span>
                </p>
                <div className="flex flex-wrap gap-4 text-sm text-zinc-700">
                  {formattedStartDate && (
                    <span>
                      <strong className="font-semibold">Início: </strong>
                      {formattedStartDate}
                    </span>
                  )}

                  {formattedEndDate && (
                    <span>
                      <strong className="font-semibold">Fim: </strong>
                      {formattedEndDate}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </>
        );
      }}
    </Modal>
  );
}

export default BookDetailsModal;
