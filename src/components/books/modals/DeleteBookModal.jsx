import Modal from "../../UI/Modal";

function DeleteBookModal({ bookName, onClose, onDelete }) {
  return (
    <Modal onClose={onClose}>
      {({ close }) => {
        return (
          <>
            <p>
              Tem certeza que desejar excluir <strong>{bookName}</strong> da sua
              lista de leitura ? Essa ação é irreversível.
            </p>
            <div className="self-end flex gap-5">
              <button
                className="bg-zinc-100 text-black/80 p-2 rounded-lg cursor-pointer hover:bg-zinc-200 transition-colors duration-200"
                onClick={close}
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
          </>
        );
      }}
    </Modal>
  );
}

export default DeleteBookModal;
