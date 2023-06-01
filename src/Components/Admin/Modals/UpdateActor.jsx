import React from 'react';
import ModalContainer from './ModalContainer';
import ActorForm from '../ActorForm';
import { toast } from 'react-hot-toast';
import { useState } from 'react';
import { updateActor } from '../../../Api/Actor';
const UpdateActor = ({ visible, initialState, onSuccess,onClose }) => {
    const [busy, setBusy] = useState(false);
    const handleSubmit = async (data) => {
        setBusy(true);
        const res = await updateActor(initialState.id, data);
        setBusy(false);
        const {error,actor} =res.data
        if (error) {
            toast.error(error)
          } 
        console.log(res, "res res from actor-update upload")
        console.log(actor, "from update actor");
        onSuccess(actor);
        toast.success( "Actor details updated successfully.");
        onClose();
      };
    return (
        <ModalContainer visible={visible} onClose={onClose} ignoreContainer>
        <ActorForm
          onSubmit={!busy ? handleSubmit : null}
          title="Update Actor"
          btnTitle="Update"
          busy={busy}
          initialState={initialState}
        />
      </ModalContainer>
    );
};

export default UpdateActor;