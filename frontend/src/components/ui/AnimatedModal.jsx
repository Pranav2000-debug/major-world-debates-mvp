import { useEffect, useState } from "react";

const AnimatedModal = ({ isOpen, onClose, title, children, loading = false }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isOpen) setShow(true);
  }, [isOpen]);

  const closeWithAnimation = () => {
    if (loading) return;
    setShow(false);
    setTimeout(onClose, 200);
  };

  // ESC key close
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && closeWithAnimation();
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen]);

  if (!isOpen && !show) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6 transition-opacity duration-200 ${
        show ? "opacity-100" : "opacity-0"
      } bg-black/70 backdrop-blur-sm`}
      onClick={closeWithAnimation}>
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-gray-800 rounded-xl p-6 w-full max-w-md mx-auto transform transition-all duration-200 ${
          show ? "scale-100 translate-y-0 opacity-100" : "scale-95 translate-y-4 opacity-0"
        }`}>
        {/* Close button */}
        <button onClick={closeWithAnimation} className="absolute top-3 right-3 text-gray-400 hover:text-white transition" aria-label="Close">
          ✕
        </button>

        {title && <h2 className="text-xl font-semibold text-white mb-4">{title}</h2>}

        {children}
      </div>
    </div>
  );
};

export default AnimatedModal;
