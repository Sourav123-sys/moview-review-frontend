import React from 'react';
import { useState } from 'react';
import { BsBoxArrowUpRight, BsPencilSquare, BsTrash } from "react-icons/bs";
import { deleteMovie } from '../../Api/Movie';
import { toast } from 'react-hot-toast';
import UpdateMovie from './UpdateMovie';
import ConfirmModal from './Modals/ConfirmModal';
const MovieListItem = ({ movie, onDeleteClick, onEditClick, onOpenClick,afterDelete, afterUpdate }) => {

  const { poster, title, genres = [], status } = movie;
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [busy, setBusy] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState(null);

   const handleOnDeleteConfirm = async () => {
         setBusy(true);
         const res = await deleteMovie(movie.id);
         setBusy(false);
         const { error, message } = res.data
          if (error) {
       toast.error(error)
   }
       if (message) {
         toast.success(message)
 }
         hideConfirmModal();
         afterDelete(movie);


       };
         const handleOnEditClick = () => {
    setShowUpdateModal(true);
    setSelectedMovieId(movie.id);
  };
    const handleOnUpdate = (movie) => {
    afterUpdate(movie);
    setShowUpdateModal(false);
    setSelectedMovieId(null);
  };
       const displayConfirmModal = () => setShowConfirmModal(true);
  const hideConfirmModal = () => setShowConfirmModal(false);
  const hideUpdateForm = () => setShowUpdateModal(false);
    return (
      <>
      <MovieCard
        movie={movie}
        onDeleteClick={displayConfirmModal}
        onEditClick={handleOnEditClick}
      />
      <div className="p-0">
        <ConfirmModal
          visible={showConfirmModal}
          onConfirm={handleOnDeleteConfirm}
          onCancel={hideConfirmModal}
          title="Are you sure?"
          subtitle="This action will remove this movie permanently!"
          busy={busy}
        />
        <UpdateMovie
          movieId={selectedMovieId}
          visible={showUpdateModal}
          onSuccess={handleOnUpdate}
        onClose={hideUpdateForm}

        />
      </div>
    </>  
    );
};


const MovieCard = ({ movie, onDeleteClick, onEditClick, onOpenClick }) => {
  const { poster, title, genres = [], status } = movie;
  return (
    <table className="w-full border-b">
      <tbody>
        <tr>
          <td>
            <div className="w-24">
              <img className="w-full aspect-video" src={poster} alt={title} />
            </div>
          </td>

          <td className="w-full pl-5">
            <div>
              <h1 className="text-lg font-semibold text-primary dark:text-white">
                {title}
              </h1>
              <div className="space-x-1">
                {genres.map((g, index) => {
                  return (
                    <span
                      key={g + index}
                      className=" text-primary dark:text-white text-xs"
                    >
                      {g}
                    </span>
                  );
                })}
              </div>
            </div>
          </td>

          <td className="px-5">
            <p className="text-primary dark:text-white">{status}</p>
          </td>

          <td>
            <div className="flex items-center space-x-3 text-primary dark:text-white text-lg">
              <button onClick={onDeleteClick} type="button">
                <BsTrash />
              </button>
              <button onClick={onEditClick} type="button">
                <BsPencilSquare />
              </button>
              <button onClick={onOpenClick} type="button">
                <BsBoxArrowUpRight />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
export default MovieListItem;