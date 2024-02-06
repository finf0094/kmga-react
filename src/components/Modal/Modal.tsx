import React, { useState, useEffect, useCallback } from "react";
import "./Modal.css";
import { useDispatch } from "react-redux";
import { closeModal } from "@store/slices";

interface ModalProps {
  id: string;
  title: string;
  subtitle: string;
  width: string;
  button: boolean;
  buttonText: string;
  buttonDisabled: boolean;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const Modal: React.FC<ModalProps> = ({
  id,
  title,
  subtitle,
  width,
  button,
  buttonText,
  buttonDisabled,
  children,
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(isOpen);
  const [animationClass, setAnimationClass] = useState("");

  const handleToggleModal = () => {
    if (isOpen) {
      // Closing animation
      setAnimationClass("modal-closing-animation");
      setTimeout(() => {
        setAnimationClass("");
        onClose();
      }, 300);
    } else {
      // Opening animation
      setAnimationClass("modal-opening-animation");
      onClose();
    }
  };

  const modalClass = isOpen ? "modal-open" : "modal-closed";
  const dispatch = useDispatch();

  useEffect(() => {
    setIsModalVisible(isOpen);
  }, [isOpen]);

  const handleEscapeKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        dispatch(closeModal({ id }));
      }
    },
    [dispatch, id],
  );

  useEffect(() => {
    setIsModalVisible(isOpen);

    // Add the event listener when the modal is open
    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
    }

    // Clean up the event listener when the modal is closed
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, id, handleEscapeKey]);

  return isModalVisible ? (
    <div className={`modal ${modalClass} ${animationClass}`}>
      <div
        className={`modal__wrapper ${modalClass} ${animationClass}`}
        style={{ width: `${width}px` }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal__close" onClick={handleToggleModal}>
          &times;
        </button>
        <div className="modal__head">
          <h1 className="modal__title">{title}</h1>
          <p className="modal__subtitle">{subtitle}</p>
        </div>

        <div className="modal__content">{children}</div>

        {button && (
          <button
            className="modal__button"
            onClick={onConfirm}
            disabled={buttonDisabled}
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  ) : null;
};

export default Modal;
