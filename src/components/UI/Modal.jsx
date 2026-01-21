import { useEffect, useState } from "react";

function Modal({ onClose, children }) {
  const [visible, setVisible] = useState(false);

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
      className={`fixed inset-0 z-10 px-6 bg-black/50 flex justify-center items-center transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"}`}
      onClick={handleClose}
    >
      <div
        className="flex flex-col gap-5 bg-white p-4 w-full max-w-4xl max-h-155 overflow-y-auto rounded-lg md:px-8 lg:px-10"
        onClick={(e) => e.stopPropagation()}
      >
        {children({ close: handleClose })}
      </div>
    </div>
  );
}

export default Modal;
