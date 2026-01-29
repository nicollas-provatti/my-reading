import { useState } from "react";
import ButtonSpinner from "./ButtonSpinner";
import { uploadCover } from "../../services/uploadService";

function CoverInput({ value, onChange, onUploadingChange }) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);

  async function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setIsUploading(true);
      setError(null);
      onUploadingChange?.(true);

      const url = await uploadCover(file);
      onChange(url);
    } catch {
      setError("Erro ao fazer upload da imagem");
    } finally {
      setIsUploading(false);
      onUploadingChange?.(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="font-semibold">Capa do livro</label>

      <input
        type="text"
        placeholder="URL da imagem (opcional)"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="flex items-center gap-3">
        <span className="text-sm text-zinc-500">ou</span>

        <label className="cursor-pointer text-sm text-blue-600 hover:underline">
          Enviar imagem
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>

      {isUploading && (
        <div className="flex items-center gap-2 text-sm text-zinc-600">
          <ButtonSpinner />
          Enviando imagem...
        </div>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}

      {value && (
        <div className="h-48 m-auto">
          <img
            src={value}
            alt="Preview da capa"
            className="h-full object-contain rounded-lg"
          />
        </div>
      )}
    </div>
  );
}

export default CoverInput;
