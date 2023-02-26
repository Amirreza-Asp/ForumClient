import ReactModal from 'react-modal';
import React from 'react';
import { observer } from 'mobx-react-lite';
import {useStore} from "./../../stores/store";

export default observer(function ModalContainer() {

  const {modalStore} = useStore();
  const {modal} = modalStore;

  return (
    <ReactModal 
        shouldCloseOnOverlayClick={true} 
        isOpen={modal.open}
        ariaHideApp={false}
        onRequestClose={()=>modalStore.closeModal()}
    >
        <>
            {
                modal.body
            }
        </>
    </ReactModal>
  )
});
