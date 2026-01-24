import Modal from "../../UI/Modal";
import Form from "../../forms/Form";

function EditBookModal({ book, onClose }) {

  const editData = { book };

  return (
    <Modal onClose={onClose}>
      {({ close }) => {
        return <Form close={close} isEditMode={editData} />;
      }}
    </Modal>
  );
}

export default EditBookModal;
