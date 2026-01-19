import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

const statusStyles = {
  concluido: "text-green-950 bg-green-100",
  andamento: "text-indigo-950 bg-indigo-100",
  fila: "text-amber-950 bg-amber-100",
  proxima: "text-blue-950 bg-blue-100",
  abandonado: "text-red-950 bg-red-100",
};

function BookDetails({ book, onClose }) {
  const [visible, setVisible] = useState(false);

  let {
    capa,
    nome,
    autor,
    generos,
    paginas,
    resumo,
    status,
    dataInicio,
    dataFim,
    avaliacao,
  } = book;

  dataInicio = new Date(dataInicio);
  dataFim = new Date(dataFim);

  const dataInicioFormatada = new Intl.DateTimeFormat("pt-BR").format(
    dataInicio,
  );
  const dataFimFormatada = new Intl.DateTimeFormat("pt-BR").format(dataFim);

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

  return (
    <div
      className={`
        fixed inset-0 z-10 px-6 bg-black/50 
        flex justify-center items-center
        transition-opacity duration-300
        ${visible ? "opacity-100" : "opacity-0"}`}
      onClick={handleClose}
    >
      <div
        className={`flex flex-col bg-white p-4 max-w-4xl w-full max-h-155 overflow-y-auto rounded-lg
          transition-all duration-300
          ${
            visible ? "scale-100 opacity-100" : "scale-95 opacity-0"
          } md:px-8 lg:px-10`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center border-b border-zinc-300 pb-2">
          <h2 className="font-semibold text-lg">Detalhes do livro</h2>
          <button
            className="self-end p-1 rounded-full text-white bg-red-200 cursor-pointer transition-colors duration-200 hover:bg-red-300"
            onClick={handleClose}
          >
            <IoMdClose />
          </button>
        </div>
        <div>
          <div className="max-w-78 m-auto">
            <img src={capa} alt={nome} className="w-full" />
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="border-t border-zinc-300 pt-1 font-semibold text-xl">
              {nome}
            </h1>
            <p>
              <strong className="font-semibold">Autor: </strong>
              {autor}
            </p>
            <ul className="flex gap-2">
              <strong className="font-semibold">Gêneros: </strong>
              {generos.map((genero) => (
                <li
                  className="px-2 py-1 rounded-md text-xs text-zinc-800 bg-zinc-200"
                  key={genero}
                >
                  {genero}
                </li>
              ))}
            </ul>
            <p>
              <strong className="font-semibold">Número de páginas: </strong>
              {paginas}
            </p>
            <p>
              <strong className="font-semibold">Resumo: </strong>"{resumo}"
            </p>
            <p>
              <strong className="font-semibold">Status: </strong>{" "}
              <span
                className={`px-2 py-1 rounded-md text-sm ${statusStyles[status[1]]}`}
              >
                {status[0]}
              </span>
            </p>
            <p>
              <strong className="font-semibold">Data de início: </strong>
              {dataInicioFormatada}
            </p>
            <p>
              <strong className="font-semibold">Data de fim: </strong>
              {dataFimFormatada}
            </p>
            {avaliacao !== null && avaliacao !== 0 && (
              <p><strong className="font-semibold">Avaliação: </strong>{"⭐".repeat(avaliacao)}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
