import { useState } from "react";
import TabButton from "./TabButton";
import NewBook from "./NewBook";

function TabButtons() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <>
      <div className="flex flex-col gap-3 justify-between px-4 py-2 mb-3 sm:flex-row">
        <ul className="flex gap-2">
          <li>
            <TabButton filter="bookcase">Estante</TabButton>
          </li>
          <li>
            <TabButton filter="readingStatus">Status de Leitura</TabButton>
          </li>
        </ul>

        <button
          className="px-4 py-2 rounded-md font-semibold cursor-pointer text-white bg-blue-500 transition-colors duration-300 hover:bg-blue-600"
          onClick={openModal}
        >
          Novo
        </button>
      </div>

      {isModalOpen && <NewBook onClose={closeModal} />}
    </>
  );
}

export default TabButtons;
