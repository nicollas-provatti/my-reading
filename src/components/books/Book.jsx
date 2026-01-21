import { useState, useContext } from "react";
import BookDetails from "./modals/BookDetailsModal";
import { CiEdit, CiTrash } from "react-icons/ci";
import { BookContext } from "../../store/book-context";
import EditBookModal from "./modals/EditBookModal";
import DeleteBookModal from "./modals/DeleteBookModal";

const statusStyles = {
  concluido: "text-green-950 bg-green-100",
  andamento: "text-indigo-950 bg-indigo-100",
  fila: "text-amber-950 bg-amber-100",
  proxima: "text-blue-950 bg-blue-100",
  abandonado: "text-red-950 bg-red-100",
};

function Book({ book, filter }) {
  const { deleteBook } = useContext(BookContext);
  const [isModalDetailsOpen, setIsModalDetailsOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const { id, cover, name, author, genres, pages, status, assessment } = book;

  const classesStatus = statusStyles[status[1]];
  const capaURL = cover ? cover : "/covers/placeholder.svg";

  function openModalDetails() {
    setIsModalDetailsOpen(true);
  }

  function closeModalDetails() {
    setIsModalDetailsOpen(false);
  }

  function openModalDelete() {
    setIsModalDeleteOpen(true);
  }

  function closeModalDelete() {
    setIsModalDeleteOpen(false);
  }

  function openModalEdit() {
    setIsModalEditOpen(true);
  }

  function closeModalEdit() {
    setIsModalEditOpen(false);
  }

  return (
    <>
      <div
        className="group flex flex-col relative z-0 rounded-xl shadow-md overflow-hidden cursor-pointer transition-colors duration-200 hover:bg-zinc-50"
        onClick={openModalDetails}
      >
        <div
          className="flex absolute bottom-4 right-5 bg-white border border-zinc-200 rounded-md   opacity-100 transition-opacity duration-200 lg:opacity-0 lg:group-hover:opacity-100 lg:right-3"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="px-2 py-1 border-r border-zinc-200 cursor-pointer transition-colors duration-200 hover:bg-zinc-200"
            onClick={openModalEdit}
          >
            <CiEdit />
          </button>
          <button
            className="px-2 py-1 cursor-pointer transition-colors duration-200 hover:bg-zinc-200"
            onClick={openModalDelete}
          >
            <CiTrash />
          </button>
        </div>

        <div className="border-b border-gray-200 h-48">
          <img
            src={capaURL}
            alt="livro"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex flex-col justify-between gap-3 p-4 flex-1">
          <h2 className="font-semibold text-lg">{name}</h2>
          <h3 className="text-sm font-light">{author}</h3>
          <ul className="flex gap-2">
            {genres.map((gender) => (
              <li key={gender} className="px-2 py-1 rounded-md text-xs text-zinc-800 bg-zinc-200">
                {gender}
              </li>
            ))}
          </ul>
          <p className="text-sm font-light">{pages} páginas</p>
          {assessment !== null && assessment !== 0 && (
            <p className="text-sm">{"⭐".repeat(assessment)}</p>
          )}
          {filter && (
            <p
              className={
                "self-start px-2 py-1 rounded-md text-sm " + classesStatus
              }
            >
              {status[0]}
            </p>
          )}
        </div>
      </div>
      {isModalDetailsOpen && (
        <BookDetails book={book} onClose={closeModalDetails} />
      )}
      {isModalDeleteOpen && (
        <DeleteBookModal
          bookName={name}
          onDelete={() => deleteBook(id)}
          onClose={closeModalDelete}
        />
      )}
      {isModalEditOpen && (
        <EditBookModal book={book} onClose={closeModalEdit} />
      )}
    </>
  );
}

export default Book;
