import React from 'react';
import ModalContainer from './Modals/ModalContainer';
import MovieForm from './MovieForm';
import { useState } from 'react';
import { updateMovie } from '../../Api/Movie';
import { toast } from 'react-hot-toast';

const UpdateMovie = ({ visible, initialState, onSuccess, onClose, }) => {
    

  const [busy, setBusy] = useState(false);
    const handleSubmit = async (data) => {
      console.log(data,"data from handlesubmit");
    setBusy(true);
    const res = await updateMovie(initialState.id, data);
    setBusy(false);
    console.log(res,"res-movie-update");
    const { error, movie,message } = res.data
    console.log(movie,"movie-update");
  if (error) {
      toast.error(error)
  }
      if (message) {
        toast.success(message)
}
    
    
    onSuccess(movie);
    onClose();
  };
    return (
        <ModalContainer visible={visible} onClose={onClose}  >
            <MovieForm 
              initialState={initialState}
              btnTitle="Update"
              onSubmit={!busy ? handleSubmit : null}
              busy={busy}
            
            />
      </ModalContainer>
    );
};

export default UpdateMovie;