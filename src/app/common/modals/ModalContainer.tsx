import ReactModal from "react-modal";
import { observer } from "mobx-react-lite";
import { useStore } from "./../../stores/store";

export default observer(function ModalContainer() {
  const { modalStore } = useStore();
  const { modal } = modalStore;

  return (
    <ReactModal
      shouldCloseOnOverlayClick={true}
      isOpen={modal.open}
      ariaHideApp={false}
      onRequestClose={() => modalStore.closeModal()}
    >
      <>
        <button
          className="modal-close-btn"
          onClick={() => modalStore.closeModal()}
        >
          <i className="fa fa-close"></i>
        </button>
        {modal.body}
      </>
    </ReactModal>
  );
});
