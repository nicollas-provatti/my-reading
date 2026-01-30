import { useEffect } from "react";

function Toast({ message, type = "success", onClose, duration = 3000 }) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const styles = {
    success: "bg-green-600",
    error: "bg-red-600",
    info: "bg-blue-600",
  };

  return (
    <div
      className={`
        fixed top-5 right-5 z-50
        px-4 py-3 rounded-lg text-white text-sm shadow-lg
        animate-slide-in
        ${styles[type]}
      `}
    >
      {message}
    </div>
  );
}

export default Toast;
