import { useState } from "react";
import { useBooks } from "../../store/books/use-books";
import { IoMdClose } from "react-icons/io";
import Input from "./Input";
import MultipleSelectInput from "./MultipleSelectInput";
import RatingInput from "./RatingInput";
import ButtonSpinner from "../UI/ButtonSpinner";
import CoverInput from "../UI/CoverInput";

function Select({ book }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor="status" className="font-semibold">
        Status
      </label>
      <select
        name="status"
        id="status"
        required
        defaultValue={`${book?.status}`}
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

function toInputDate(date) {
  if (!date) return "";
  return date.split("T")[0];
}

function Form({ close, isEditMode }) {
  const { book } = isEditMode || {};
  const defaultRating = book?.rating ?? 0;

  const { isMutating } = useBooks();
  const { addBook, editBook } = useBooks();

  const [coverUrl, setCoverUrl] = useState(book?.coverUrl ?? "");
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState(
    book?.genres?.map((g) => g.name) ?? [],
  );
  const [rating, setRating] = useState(defaultRating);

  function handleGenreChange(e) {
    const { value, checked } = e.target;

    setSelectedGenres((prev) =>
      checked ? [...prev, value] : prev.filter((g) => g !== value),
    );
  }

  function handleChoseRating(rating) {
    setRating(rating);
  }

  async function handleSubmit(e, close) {
    e.preventDefault();

    const status = e.target.status.value;

    const bookData = {
      title: e.target.nameBook.value,
      author: e.target.author.value,
      status,
      rating,
      pages: e.target.numberPages.value
        ? Number(e.target.numberPages.value)
        : null,
      genres: selectedGenres,
      coverUrl: coverUrl || null,
      summary: e.target.summary.value || null,
      startDate: e.target.startReading.value
        ? new Date(e.target.startReading.value).toISOString()
        : null,
      endDate: e.target.endReading.value
        ? new Date(e.target.endReading.value).toISOString()
        : null,
    };

    const success = isEditMode
      ? await editBook(book.id, bookData)
      : await addBook(bookData);

    if (success) {
      close();
    }
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
        <CoverInput
          value={coverUrl}
          onChange={setCoverUrl}
          onUploadingChange={setIsUploadingCover}
        />

        <Input
          label="Nome do livro"
          id="nameBook"
          type="text"
          name="nameBook"
          required
          defaultValue={`${isEditMode ? book.title : ""}`}
          placeholder="Informe o nome do livro"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Autor"
            id="author"
            type="text"
            name="author"
            required
            defaultValue={`${isEditMode ? book.author : ""}`}
            placeholder="Informe o nome do autor"
          />

          <Input
            label="Número de páginas"
            id="numberPages"
            type="number"
            name="numberPages"
            required
            defaultValue={`${isEditMode ? book.pages : ""}`}
            placeholder="Informe o número de páginas"
            min="0"
          />
        </div>

        <MultipleSelectInput
          selectedGenres={selectedGenres}
          onChange={handleGenreChange}
        />

        <Input
          label="Resumo"
          id="summary"
          textarea
          name="summary"
          defaultValue={`${isEditMode ? (book.summary ?? "") : ""}`}
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
            defaultValue={isEditMode ? toInputDate(book.startDate) : ""}
            name="startReading"
          />

          <Input
            label="Fim da leitura"
            id="endReading"
            type="date"
            defaultValue={isEditMode ? toInputDate(book.endDate) : ""}
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
          <button
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-blue-500 text-white font-medium cursor-pointer hover:bg-blue-600 transition disabled:opacity-60"
            disabled={isMutating || isUploadingCover}
          >
            {isMutating || isUploadingCover ? (
              <>
                <ButtonSpinner />
                {isUploadingCover ? "Enviando capa..." : "Salvando..."}
              </>
            ) : isEditMode ? (
              "Salvar"
            ) : (
              "Adicionar"
            )}
          </button>
        </div>
      </form>
    </>
  );
}

export default Form;
