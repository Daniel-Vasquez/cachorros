import React from "react";
import Modal from "./Modal";
import './styles/Modal.css'

function DetailsModal({closeModal, modalIsOpen, url}) {
  return (
    <Modal isOpen={modalIsOpen} onClose={closeModal}>
      <div className="DetailModal">
        <h1 className="DetailModal-text">¿Está seguro?</h1>
        <img className="DetailModal-img" src={url} alt={url}/>
        <div>
          <button onClick={closeModal} className="DetailModal-btnCancel">
            Cancelar
          </button>
          <button onClick={closeModal} className="DetailModal-btnGo">
            Ir
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default DetailsModal;
