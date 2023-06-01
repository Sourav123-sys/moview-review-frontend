import React from 'react';
import ModalContainer from './ModalContainer';
import ActorForm from '../ActorForm';
import { createActor } from '../../../Api/Actor';
import { toast } from 'react-hot-toast';
import { useState } from 'react';

const ActorModal = ({ visible, onClose }) => {
    const [busy, setBusy] = useState(false);
    const handleSubmit = async (data) => {
        setBusy(true);

        const response = await createActor(data);
        setBusy(false);
       //console.log(response, "response  from actor model");
        if (!response.data) {
            toast.error("try again")
        }
        else {
            onClose();
            toast.success("Actor created Successfully")
        }


    };
    return (
        <ModalContainer
            visible={visible}
            onClose={onClose}
            ignoreContainer
        >

            <ActorForm
                onSubmit={!busy ? handleSubmit : null}


                title="Create New Actor" btnTitle="Create"
                busy={busy}
            />

        </ModalContainer>
    );
};

export default ActorModal;