import { useState, useContext } from "react";
import { IoMdClose } from "react-icons/io";
import { BookContext } from "../../store/books/book-context";
import Input from "./Input";
import MultipleSelectInput from "./MultipleSelectInput";
import RatingInput from "./RatingInput";

function Select({ book }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor="status" className="font-semibold">
        Status
      </label>
      <select
        name="status"
        id="status"
        defaultValue={`${book?.status[0]}`}
        className="border p-1 border-zinc-300 rounded-sm"
      >
        <option value="Em andamento">Em andamento</option>
        <option value="Próxima leitura">Próxima leitura</option>
        <option value="Na fila">Na fila</option>
        <option value="Concluído">Concluído</option>
        <option value="Abandonado">Abandonado</option>
      </select>
    </div>
  );
}

function Form({ close, isEditMode }) {
  const { book } = isEditMode || {};
  const genres = book?.genres ?? [];
  const defaultRating = book?.assessment ?? 0;

  const { addBook, editBook } = useContext(BookContext);
  const [selectedGenres, setSelectedGenres] = useState(genres);
  const [rating, setRating] = useState(defaultRating);

  function handleGenreChange(e) {
    const value = e.target.value;

    setSelectedGenres((prev) =>
      prev.includes(value) ? prev.filter((g) => g !== value) : [...prev, value],
    );
  }

  function handleChoseRating(rating) {
    setRating(rating);
  }

  function handleSubmit(e, close) {
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
      cover: e.target.coverURL.value,
      name: e.target.nameBook.value,
      author: e.target.author.value,
      genres: selectedGenres,
      pages: Number(e.target.numberPages.value),
      summary: e.target.summary.value,
      status: [status, statusFormatted],
      startDate: e.target.startReading.value,
      endDate: e.target.endReading.value,
      assessment: Number(rating),
    };

    if (isEditMode) {
      bookData.id = book.id;
      editBook(bookData);
    } else {
      addBook(bookData);
    }
    close();
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-lg">Prencha os dados</h2>
        <button
          className="self-end p-1 rounded-full text-white bg-red-200 cursor-pointer transition-colors duration-200 hover:bg-red-300"
          onClick={close}
        >
          <IoMdClose />
        </button>
      </div>
      <form
        className="flex flex-col gap-5"
        onSubmit={(e) => handleSubmit(e, close)}
      >
        <Input
          label="Capa (URL)"
          id="coverURL"
          type="text"
          name="coverURL"
          defaultValue={`${isEditMode ? book.cover : ""}`}
          placeholder="Informe o URL da imagem"
        />

        <Input
          label="Nome do livro"
          id="nameBook"
          type="text"
          name="nameBook"
          defaultValue={`${isEditMode ? book.name : ""}`}
          placeholder="Informe o nome do livro"
        />

        <Input
          label="Autor"
          id="author"
          type="text"
          name="author"
          defaultValue={`${isEditMode ? book.author : ""}`}
          placeholder="Informe o nome do autor"
        />

        <MultipleSelectInput book={book} onChange={handleGenreChange} />

        <Input
          label="Número de páginas"
          id="numberPages"
          type="number"
          name="numberPages"
          defaultValue={`${isEditMode ? book.pages : ""}`}
          placeholder="Informe o número de páginas"
          min="0"
        />

        <Input
          label="Resumo"
          id="summary"
          textarea
          name="summary"
          defaultValue={`${isEditMode ? book.summary : ""}`}
          placeholder="Informe o resumo"
          cols="32"
        />

        <Select book={book} />

        <Input
          label="Início da leitura"
          id="startReading"
          type="date"
          defaultValue={`${isEditMode ? book.startDate : ""}`}
          name="startReading"
        />

        <Input
          label="Fim da leitura"
          id="endReading"
          type="date"
          defaultValue={`${isEditMode ? book.endDate : ""}`}
          name="endReading"
        />

        <RatingInput onClick={handleChoseRating} rating={defaultRating} />

        <div className="self-end flex gap-3">
          <button
            className="px-3 py-2 text-black/80 bg-zinc-300 rounded-md cursor-pointer transition-colors duration-300 hover:bg-zinc-400"
            type="button"
            onClick={close}
          >
            Cancelar
          </button>
          <button className="px-3 py-2 text-black/80 bg-blue-300 rounded-md cursor-pointer transition-colors duration-300 hover:bg-blue-400">
            {isEditMode ? "Salvar" : "Adicionar"}
          </button>
        </div>
      </form>
    </>
  );
}

export default Form;
