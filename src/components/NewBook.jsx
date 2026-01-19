import { useEffect, useState, useContext } from "react";
import { IoMdClose } from "react-icons/io";
import Input from "./Input";
import { BookContext } from "../store/book-context";

const GENRES = [
  "Fantasia",
  "Romance",
  "Ficção Científica",
  "Aventura",
  "Não-ficção",
  "Biografia",
];

function MultipleSelectInput({ onChange }) {
  return (
    <div>
      <label className="font-semibold">Gênero(s)</label>
      <div className="grid grid-cols-2 mt-1 md:grid-cols-3">
        {GENRES.map((genre) => (
          <label key={genre} className="flex items-center gap-2">
            <input type="checkbox" value={genre} onChange={onChange} />
            {genre}
          </label>
        ))}
      </div>
    </div>
  );
}

function RantingInput({ onClick }) {
  return (
    <div className="flex items-center gap-1">
      <label htmlFor="rating" className="font-semibold">
        Avaliação:{" "}
      </label>
      <div className="rating rating-sm">
        <input
          type="radio"
          name="rating-6"
          id="rating"
          className="mask mask-star-2 bg-orange-400"
          aria-label="1 star"
          onClick={() => onClick(1)}
        />
        <input
          type="radio"
          name="rating-6"
          className="mask mask-star-2 bg-orange-400"
          aria-label="2 star"
          onClick={() => onClick(2)}
        />
        <input
          type="radio"
          name="rating-6"
          className="mask mask-star-2 bg-orange-400"
          aria-label="3 star"
          onClick={() => onClick(3)}
        />
        <input
          type="radio"
          name="rating-6"
          className="mask mask-star-2 bg-orange-400"
          aria-label="4 star"
          onClick={() => onClick(4)}
        />
        <input
          type="radio"
          name="rating-6"
          className="mask mask-star-2 bg-orange-400"
          aria-label="5 star"
          onClick={() => onClick(5)}
        />
      </div>
    </div>
  );
}

function NewBook({ onClose }) {
  const { addBook } = useContext(BookContext);
  const [visible, setVisible] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(true);
    }, 0);

    return () => clearTimeout(timeout);
  }, []);

  function handleClose() {
    setVisible(false);
    setTimeout(onClose, 300);
  }

  function handleGenreChange(e) {
    const value = e.target.value;

    setSelectedGenres((prev) =>
      prev.includes(value) ? prev.filter((g) => g !== value) : [...prev, value]
    );
  }

  function handleChoseRating(rating) {
    setRating(rating);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const status = e.target.status.value;
    let statusFormatted = "";

    if (status === "Em andamento") {
      statusFormatted = "andamento";
    } else if (status === "Concluído") {
      statusFormatted = "concluido";
    } else if (status === "Abandonado") {
      statusFormatted = "abandonado";
    } else if (status === "Próxima leitura") {
      statusFormatted = "proxima";
    } else if (status === "Na fila") {
      statusFormatted = "fila";
    }

    const bookData = {
      capa: e.target.capaURL.value,
      nome: e.target.nomeLivro.value,
      autor: e.target.autor.value,
      generos: selectedGenres,
      paginas: Number(e.target.numeroPaginas.value),
      resumo: e.target.resumo.value,
      status: [status, statusFormatted],
      dataInicio: e.target.inicioLeitura.value,
      dataFim: e.target.fimLeitura.value,
      avaliacao: Number(rating),
    };

    addBook(bookData);
    handleClose();
  }

  return (
    <div
      className={`
        fixed z-10 inset-0 px-6 bg-black/50 
        flex justify-center items-center
        transition-opacity duration-300
        ${visible ? "opacity-100" : "opacity-0"}`}
      onClick={handleClose}
    >
      {" "}
      {/* /* overlay */}
      <div
        className={`flex flex-col gap-4 bg-white p-4 max-w-4xl w-full max-h-155 overflow-y-auto rounded-lg
          transition-all duration-300
          ${
            visible ? "scale-100 opacity-100" : "scale-95 opacity-0"
          } md:px-8 lg:px-10`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-lg">Prencha os dados</h2>
          <button
            className="self-end p-1 rounded-full text-white bg-red-200 cursor-pointer transition-colors duration-200 hover:bg-red-300"
            onClick={handleClose}
          >
            <IoMdClose />
          </button>
        </div>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <Input
            label="Capa (URL)"
            id="capaURL"
            type="text"
            name="capaURL"
            placeholder="Informe o URL da imagem"
          />

          <Input
            label="Nome do livro"
            id="nomeLivro"
            type="text"
            name="nomeLivro"
            placeholder="Informe o nome do livro"
          />

          <Input
            label="Autor"
            id="autor"
            type="text"
            name="autor"
            placeholder="Informe o nome do autor"
          />

          <MultipleSelectInput onChange={handleGenreChange} />

          <Input
            label="Número de páginas"
            id="numeroPaginas"
            type="number"
            name="numeroPaginas"
            placeholder="Informe o número de páginas"
            min="0"
          />

          <Input
            label="Resumo"
            id="resumo"
            textarea
            name="resumo"
            placeholder="Informe o número de páginas"
            cols="32"
          />

          <div className="flex flex-col gap-1">
            <label htmlFor="status" className="font-semibold">
              Status
            </label>
            <select
              name="status"
              id="status"
              className="border p-1 border-zinc-300 rounded-sm"
            >
              <option value="Em andamento">Em andamento</option>
              <option value="Próxima leitura">Próxima leitura</option>
              <option value="Na fila">Na fila</option>
              <option value="Concluído">Concluído</option>
              <option value="Abandonado">Abandonado</option>
            </select>
          </div>

          <Input
            label="Início da leitura"
            id="inicioLeitura"
            type="date"
            name="inicioLeitura"
          />

          <Input
            label="Fim da leitura"
            id="fimLeitura"
            type="date"
            name="fimLeitura"
          />

          <RantingInput onClick={handleChoseRating} />

          <div className="self-end flex gap-3">
            <button
              className="px-3 py-2 text-black/80 bg-zinc-300 rounded-md cursor-pointer transition-colors duration-300 hover:bg-zinc-400"
              type="button"
              onClick={handleClose}
            >
              Cancelar
            </button>
            <button className="px-3 py-2 text-black/80 bg-blue-300 rounded-md cursor-pointer transition-colors duration-300 hover:bg-blue-400">
              Adicionar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewBook;
