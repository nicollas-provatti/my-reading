import { FiAlertTriangle } from "react-icons/fi";

function Error({ error }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
      <FiAlertTriangle className="text-red-500 text-3xl" />
      <p className="font-semibold text-red-600">
        Não foi possível carregar os livros
      </p>
      <p className="text-sm text-zinc-600">{error}</p>
    </div>
  );
}

export default Error;
