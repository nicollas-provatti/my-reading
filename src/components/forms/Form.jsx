import { useState } from "react";
import { useBooks } from "../../store/books/use-books";
import { IoMdClose } from "react-icons/io";
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
        className="border border-zinc-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
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

  const { addBook, editBook } = useBooks();
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
      <div className="flex justify-between items-center px-3 py-2 bg-white shadow-sm rounded-md">
        <h2 className="font-semibold text-lg">Preencha os dados</h2>
        <button
          className="p-2 rounded-full text-zinc-500 bg-zinc-50 hover:bg-zinc-100 transition cursor-pointer"
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Autor"
            id="author"
            type="text"
            name="author"
            defaultValue={`${isEditMode ? book.author : ""}`}
            placeholder="Informe o nome do autor"
          />

          <Input
            label="Número de páginas"
            id="numberPages"
            type="number"
            name="numberPages"
            defaultValue={`${isEditMode ? book.pages : ""}`}
            placeholder="Informe o número de páginas"
            min="0"
          />
        </div>

        <MultipleSelectInput book={book} onChange={handleGenreChange} />

        <Input
          label="Resumo"
          id="summary"
          textarea
          name="summary"
          defaultValue={`${isEditMode ? book.summary : ""}`}
          placeholder="Informe o resumo"
          cols="32"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select book={book} />

          <RatingInput onClick={handleChoseRating} rating={defaultRating} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        </div>

        <div className="self-end flex gap-3">
          <button
            className=" px-4 py-2 rounded-md bg-zinc-200 text-zinc-700 cursor-pointer hover:bg-zinc-300 transition"
            type="button"
            onClick={close}
          >
            Cancelar
          </button>
          <button className=" px-4 py-2 rounded-md bg-blue-500 text-white font-medium cursor-pointer hover:bg-blue-600 transition">
            {isEditMode ? "Salvar" : "Adicionar"}
          </button>
        </div>
      </form>
    </>
  );
}

export default Form;
