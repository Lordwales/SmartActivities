import React, { useContext } from 'react'
import { Modal} from 'semantic-ui-react';
import { RootStoreContext } from '../../stores/rootstore';
import { observer } from 'mobx-react-lite';

const ModalContainer = () => {
    const rootStore = useContext(RootStoreContext)
    const {modal:{open,body},closeModal} = rootStore.modalStore;
    return (
        <Modal open ={open} onClose = {closeModal} size='mini' >
            
            <Modal.Content image>
                {body}
                
            </Modal.Content>
        </Modal>
    )
}

export default observer (ModalContainer);
