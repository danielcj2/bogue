import React from "react";
import { GrClose } from "react-icons/gr";

const Modal = ({ children, title, isActive, type, id, setModal }) => {
  return (
    <div
      className={`modal${
        isActive ? " modal-active" : ""
      } modal-${type} modal-${id}`}
    >
      <div className="modal__header">
        <div className="modal__header__title upp">{title}</div>
        <div className="modal__header__close" onClick={() => setModal("")}>
          <GrClose />
        </div>
      </div>
      <div className="modal__content">{children}</div>
    </div>
  );
};

export default Modal;
