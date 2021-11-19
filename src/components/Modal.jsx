import ReactDOM from "react-dom";
import './styles/Modal.css'


function Modal({isOpen, onClose, children}) {
  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="Modal">
      <div className="Modal__container">
        {children}
      </div>
    </div>,
    document.getElementById("modal")
  );
}

export default Modal;
