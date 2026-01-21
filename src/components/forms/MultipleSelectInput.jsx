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

function MultipleSelectInput({ book, onChange }) {
  const geners = book?.genres ?? [];

  return (
    <div>
      <label className="font-semibold">Gênero(s)</label>
      <div className="grid grid-cols-2 mt-1 md:grid-cols-3">
        {GENRES.map((genre) => {
          const isChecked = geners.includes(genre);
          return (
            <label key={genre} className="flex items-center gap-2">
              <input
                type="checkbox"
                defaultChecked={isChecked}
                defaultValue={genre}
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
