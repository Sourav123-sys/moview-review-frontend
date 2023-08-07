import React from 'react';
import { BsBoxArrowUpRight, BsPencilSquare, BsTrash } from "react-icons/bs";
import MovieListItem from './MovieListItem';
import { useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { deleteMovie, getMovieForUpdate, getMovies } from '../../Api/Movie';
import UpdateMovie from './UpdateMovie';
import ConfirmModal from './Modals/ConfirmModal';
import { useMovies } from '../../Hooks/Hooks';


const pageNo = 0;
const limit = 5;

const LatesUpload = () => {
  // const [movies, setMovies] = useState([]);
  // const [busy, setBusy] = useState(false);
  // const [showConfirmModal, setShowConfirmModal] = useState(false);
  // const [showUpdateModal, setShowUpdateModal] = useState(false);
  // const [selectedMovie, setSelectedMovie] = useState(null);
  
//   const fetchLatestUploads = async () => {
//     const res = await getMovies(pageNo, limit);
//     const { error, movies } = res.data
//         if (error) {
//             toast.error(error)
//         }

//     setMovies([...movies]);
//   };
const { fetchLatestUploads, latestUploads } = useMovies();


//   const handleOnDeleteClick = (movie) => {
//     setSelectedMovie(movie);
//     setShowConfirmModal(true);
//   };
//   const handleOnEditClick = async ({ id }) => {
//     const res = await getMovieForUpdate(id);
//     setShowUpdateModal(true);
//     console.log(res, "res-movie-update");
//     const { error, movie } = res.data
//     console.log(movie, "movie-handleeditClick");
//     if (error) {
//         toast.error(error)
//     }
//     setSelectedMovie(movie);
    
// };
// const handleOnDeleteConfirm = async () => {
//   setBusy(true);
//   const res = await deleteMovie(selectedMovie.id);
//   setBusy(false);
//   const { error, message } = res.data
//    if (error) {
// toast.error(error)
// }
// if (message) {
//   toast.success(message)
// }
// fetchLatestUploads();
// hideConfirmModal();

// };
// const handleOnUpdate = (movie) => {
//   const updatedMovies = movies.map((m) => {
//     if (m.id === movie.id) return movie;
//     return m;
//   });

//   setMovies([...updatedMovies]);
// };
// const hideConfirmModal = () => setShowConfirmModal(false);
//   const hideUpdateModal = () => setShowUpdateModal(false);


  
  const handleUIUpdate = () => fetchLatestUploads();

  useEffect(() => {
    fetchLatestUploads();
  }, []);
  
    return (
      <>
      <div className="bg-white shadow dark:shadow dark:bg-secondary p-5 rounded col-span-2">
        <h1 className="font-semibold text-2xl mb-2 text-primary dark:text-white">
          Recent Uploads
        </h1>

         <div className="space-y-3">
          {latestUploads.map((movie) => {
            return (
              <MovieListItem
                key={movie.id}
                movie={movie}
                afterDelete={handleUIUpdate}
                afterUpdate={handleUIUpdate}
                // onDeleteClick={() => handleOnDeleteClick(movie)}
                // onEditClick={() => handleOnEditClick(movie)}
              />
            );
          })}
        </div> 
      </div>

      {/* <ConfirmModal
        title="Are you sure?"
        subtitle="This action will remove this movie permanently!"
        visible={showConfirmModal}
        onCancel={hideConfirmModal}
        onConfirm={handleOnDeleteConfirm}
        busy={busy}
      />

      <UpdateMovie
        visible={showUpdateModal}
        onClose={hideUpdateModal}
        initialState={selectedMovie}
        onSuccess={handleOnUpdate}
      /> */}
    </>
    );
};

export default LatesUpload;


