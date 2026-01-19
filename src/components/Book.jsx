import { useState, useContext } from "react";
import BookDetails from "./BookDetails";
import { CiEdit, CiTrash } from "react-icons/ci";
import { BookContext } from "../store/book-context";
import ModalEdit from "./ModalEdit";

const statusStyles = {
  concluido: "text-green-950 bg-green-100",
  andamento: "text-indigo-950 bg-indigo-100",
  fila: "text-amber-950 bg-amber-100",
  proxima: "text-blue-950 bg-blue-100",
  abandonado: "text-red-950 bg-red-100",
};

function ModalDelete({ onDelete, nome, onClose }) {
  return (
    <div
      className="fixed inset-0 z-10 px-6 bg-black/50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="flex flex-col gap-5 bg-white p-4 max-w-4xl rounded-lg md:px-8 lg:px-10"
        onClick={(e) => e.stopPropagation()}
      >
        <p>
          Tem certeza que desejar excluir <strong>{nome}</strong> da sua lista
          de leitura ? Essa ação é irreversível.
        </p>
        <div className="self-end flex gap-5">
          <button
            className="bg-zinc-100 text-black/80 p-2 rounded-lg cursor-pointer hover:bg-zinc-200 transition-colors duration-200"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="bg-blue-100 text-black/80 p-2 rounded-lg cursor-pointer hover:bg-blue-200 transition-colors duration-200"
            onClick={onDelete}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}

function Book({ book, filter }) {
  const { deleteBook, editBook } = useContext(BookContext);
  const [isModalDetailsOpen, setIsModalDetailsOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const { id, capa, nome, autor, generos, paginas, status, avaliacao } = book;

  const classesStatus = statusStyles[status[1]];
  const capaURL = capa ? capa : "/covers/placeholder.svg";

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

  function closeOpenEdit() {
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
          <h2 className="font-semibold text-lg">{nome}</h2>
          <h3 className="text-sm font-light">{autor}</h3>
          <ul className="flex gap-2">
            {generos.map((genero) => (
              <li className="px-2 py-1 rounded-md text-xs text-zinc-800 bg-zinc-200">
                {genero}
              </li>
            ))}
          </ul>
          <p className="text-sm font-light">{paginas} páginas</p>
          {avaliacao !== null && avaliacao !== 0 && (
            <p className="text-sm">{"⭐".repeat(avaliacao)}</p>
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
        <ModalDelete
          nome={nome}
          onDelete={() => deleteBook(id)}
          onClose={closeModalDelete}
        />
      )}
      {isModalEditOpen && <ModalEdit book={book} onEdit={editBook} onClose={closeOpenEdit}/>}
    </>
  );
}

export default Book;
