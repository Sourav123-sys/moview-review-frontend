import React from 'react';
import ModalContainer from './ModalContainer';
import ActorForm from '../ActorForm';

const ActorModal = ({ visible, onClose }) => {
    return (
        <ModalContainer
        visible={visible}
        onClose={onClose}
        ignoreContainer
      >

<ActorForm title="Create New Actor" btnTitle="Create" />
            
      </ModalContainer>
    );
};

export default ActorModal;