import { action } from "easy-peasy";

export default {
  modalComponents: [],
  openModal: action((state, payload) => {
    state.modalComponents.push(payload);
  }),
  closeModal: action((state, payload) => {
    const modalCopy = state.modalComponents.find(item => item.id === payload);
    state.modalComponents = state.modalComponents.filter(
      item => item.id !== modalCopy.id
    );
  })
};
