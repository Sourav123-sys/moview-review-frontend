import React from 'react';
import { useState } from 'react';
import MovieListItem from './MovieListItem';
import { deleteMovie, getMovieForUpdate, getMovies } from '../../Api/Movie';
import { toast } from 'react-hot-toast';
import { useEffect } from 'react';
import NextAndPrevButton from './NextAndPrevButton';
import ActorLoading from '../Spinner/ActorLoading';
import UpdateMovie from './UpdateMovie';
import ConfirmModal from './Modals/ConfirmModal';
import { useMovies } from '../../Hooks/Hooks';

const limit = 5;
let currentPageNo = 0;


const Movies = () => {
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {

        setTimeout(() => {
            setIsLoading(false)
        }, 3000);

    }, []);

    const [movies, setMovies] = useState([]);
    const [reachedToEnd, setReachedToEnd] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [busy, setBusy] = useState(false);
console.log(movies,"movies from movies");
    const {
        fetchMovies,
        movies: newMovies,
        fetchPrevPage,
        fetchNextPage,
      } = useMovies();
//     const fetchMovies = async (pageNo) => {
//         const res = await getMovies(pageNo, limit);
//         const { error, movies } = res.data
//         if (error) {
//             toast.error(error)
//         }

//         if (!movies.length) {
//             currentPageNo = pageNo - 1;
//             return setReachedToEnd(true);
//         }

//         setMovies([...movies]);
//     };
//     const handleOnNextClick = () => {
//         if (reachedToEnd) return;
//         currentPageNo += 1;
//         fetchMovies(currentPageNo);
//     };

//     const handleOnPrevClick = () => {
//         if (currentPageNo <= 0) return;
//         if (reachedToEnd) setReachedToEnd(false);

//         currentPageNo -= 1;
//         fetchMovies(currentPageNo);
//     };
//     const handleOnEditClick = async ({ id }) => {
//         const res = await getMovieForUpdate(id);
//         console.log(res, "res-movie-update");
//         const { error, movie } = res.data
//         console.log(movie, "movie-handleeditClick");
//         if (error) {
//             toast.error(error)
//         }
//         setSelectedMovie(movie);
//         setShowUpdateModal(true);
//     };
//     const handleOnDeleteClick = (movie) => {
//         setSelectedMovie(movie);
//         setShowConfirmModal(true);
//     };
//     const handleOnDeleteConfirm = async () => {
//         setBusy(true);
//         const res = await deleteMovie(selectedMovie.id);
//         setBusy(false);
//         const { error, message } = res.data
//          if (error) {
//       toast.error(error)
//   }
//       if (message) {
//         toast.success(message)
// }
//         hideConfirmModal();
//         fetchMovies(currentPageNo);


//       };
//         const handleOnUpdate = (movie) => {
//             console.log(movie, "handleOnUpdate");
//             const updatedMovies = movies.map((m) => {
//                 console.log(movie,"movie")
//                 if (m.id === movie.id) {
//                     console.log(movie);
//                     return movie;
//                 }
//                 console.log(m,"m");
//                 return m;
//             });

//             setMovies([...updatedMovies]);
//         };

//         const hideUpdateForm = () => setShowUpdateModal(false);
//         const hideConfirmModal = () => setShowConfirmModal(false);

    
      const handleUIUpdate = () => {
    fetchMovies();
  };
        useEffect(() => {
            fetchMovies(currentPageNo);
        }, []);
        return (
            <>
                {
                    isLoading === true ? <ActorLoading /> :
                        <>
                            <div className="space-y-3 p-5">
                                {newMovies.map((movie) => {
                                    return <MovieListItem key={movie.id} movie={movie}
                                        
                                    afterDelete={handleUIUpdate}
                                    afterUpdate={handleUIUpdate}
                                        // onEditClick={() => handleOnEditClick(movie)}
                                        // onDeleteClick={() => handleOnDeleteClick(movie)}
                                    />;
                                })}

                                <NextAndPrevButton
                                    className="mt-5"
                                    onNextClick={fetchNextPage}
                                    onPrevClick={fetchPrevPage}
                                />
                            </div>
                            {/* <ConfirmModal
                                visible={showConfirmModal}
                                onCancel={hideConfirmModal}
                                onConfirm={handleOnDeleteConfirm}
                                title="Are you sure?"
                                subtitle="This action will remove this movie permanently!"
                                busy={busy}
                            />
                            <UpdateMovie
                                visible={showUpdateModal}
                                initialState={selectedMovie}

                                onSuccess={handleOnUpdate}
                                onClose={hideUpdateForm}
                            /> */}
                        </>


                }
            </>

        );
    };

    export default Movies;