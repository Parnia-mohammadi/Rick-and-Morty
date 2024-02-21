import { XCircleIcon } from "@heroicons/react/24/outline";

function Modal({ children, isOpen, setIsOpen }) {
  if (!isOpen) return null;
  return (
    <div>
      <div className="backdrop" onClick={() => setIsOpen(false)}></div>
      <div className="modal">
        <div className="modal__header">
          <h2 className="title">Favorite Characters :</h2>
          <button className="icon close" onClick={() => setIsOpen(false)}>
            <XCircleIcon />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default Modal;
