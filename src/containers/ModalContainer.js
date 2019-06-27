import React from "react";

import { useStoreState } from "easy-peasy";

import { Modal } from "reactstrap";

function ModalContainer() {
  const modalComponents = useStoreState(state => state.modal.modalComponents);

  const modals = modalComponents.length
    ? modalComponents.map(modal => (
        <Modal
          isOpen
          key={modal.id}
          toggle={modal.closeModal}
        >
          {modal.component}
        </Modal>
      ))
    : null;

  return <>{modals}</>;
}

export default ModalContainer;
