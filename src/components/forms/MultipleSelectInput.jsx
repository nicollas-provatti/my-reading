const GENRES = [
  "Fantasia",
  "Romance",
  "Ficção Científica",
  "Aventura",
  "Não-ficção",
  "Biografia",
  "Distopia",
  "Política",
  "Literatura Brasileira",
  "Desenvolvimento Pessoal",
  "Tecnologia",
  "Programação",
  "Fábula",
  "Sátira Política",
];

function MultipleSelectInput({ selectedGenres, onChange }) {
  return (
    <div>
      <label className="font-semibold">Gênero(s)</label>

      <div className="grid grid-cols-2 mt-1 gap-2 md:grid-cols-3">
        {GENRES.map((genre) => {
          const isChecked = selectedGenres.includes(genre);

          return (
            <label
              key={genre}
              className={`flex gap-2 px-2 py-1 rounded-md cursor-pointer text-sm ${
                isChecked
                  ? "bg-blue-100 text-blue-900"
                  : "bg-zinc-100"
              }`}
            >
              <input
                type="checkbox"
                checked={isChecked}
                value={genre}
                onChange={onChange}
              />
              {genre}
            </label>
          );
        })}
      </div>
    </div>
  );
}

export default MultipleSelectInput;
