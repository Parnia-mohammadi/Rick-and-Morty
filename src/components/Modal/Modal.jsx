import { XCircleIcon } from "@heroicons/react/24/outline";
import style from "./Modal.module.css";

function Modal({ children, isOpen, setIsOpen }) {
  if (!isOpen) return null;
  return (
    <div>
      <div className={style.backdrop} onClick={() => setIsOpen(false)}></div>
      <div className={style.modal}>
        <div className={style.modal__header}>
          <h2 className={style.title}>Favorite Characters :</h2>
          <button
            className={`icon ${style.close}`}
            onClick={() => setIsOpen(false)}
          >
            <XCircleIcon />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default Modal;
