import React from 'react';
import ModalContainer from './Modals/ModalContainer';
import MovieForm from './MovieForm';
import { useState } from 'react';
import { getMovieForUpdate, updateMovie } from '../../Api/Movie';
import { toast } from 'react-hot-toast';
import { useEffect } from 'react';

const UpdateMovie = ({movieId, visible, initialState, onSuccess, onClose }) => {
    

  const [busy, setBusy] = useState(false);
  const [ready, setReady] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(false);
 
    const handleSubmit = async (data) => {
      console.log(data,"data from handlesubmit");
    setBusy(true);
    const res = await updateMovie(movieId, data);
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
      onClose();
    onSuccess(movie);
    
  };
    const fetchMovieToUpdate = async () => {
      const res = await getMovieForUpdate(movieId);
      const { movie, error } = res.data
      if (error) {
        toast.error(error)
    }
    setReady(true);
    setSelectedMovie(movie);
  };

  useEffect(() => {
    if (movieId) fetchMovieToUpdate();
  }, [movieId]);
    return (
      <ModalContainer visible={visible}>
      {ready ? (
        <MovieForm
          initialState={selectedMovie}
          btnTitle="Update"
          onSubmit={!busy ? handleSubmit : null}
          busy={busy}
        />
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <p className="text-light-subtle dark:text-dark-subtle animate-pulse text-xl">
            Please wait...
          </p>
        </div>
      )}
    </ModalContainer>
    );
};

export default UpdateMovie;