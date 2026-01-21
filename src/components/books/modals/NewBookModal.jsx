import Modal from "../../UI/Modal";
import Form from "../../forms/Form";

function NewBookModal({ onClose }) {
  return (
    <Modal onClose={onClose}>
      {({ close }) => {
        return <Form close={close} />;
      }}
    </Modal>
  );
}

export default NewBookModal;
