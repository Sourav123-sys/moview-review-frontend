import React from 'react';
import { useState } from 'react';
import MovieListItem from './MovieListItem';
import { getMovies } from '../../Api/Movie';
import { toast } from 'react-hot-toast';
import { useEffect } from 'react';
import NextAndPrevButton from './NextAndPrevButton';
import ActorLoading from '../Spinner/ActorLoading';
const limit = 1;
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

    const fetchMovies = async (pageNo) => {
        const res  = await getMovies(pageNo, limit);
        const { error, movies } = res.data
        if (error) {
            toast.error(error)
        } 
    
        if (!movies.length) {
          currentPageNo = pageNo - 1;
          return setReachedToEnd(true);
        }
    
        setMovies([...movies]);
      };
      const handleOnNextClick = () => {
        if (reachedToEnd) return;
        currentPageNo += 1;
        fetchMovies(currentPageNo);
      };
    
      const handleOnPrevClick = () => {
        if (currentPageNo <= 0) return;
        if (reachedToEnd) setReachedToEnd(false);
    
        currentPageNo -= 1;
        fetchMovies(currentPageNo);
      };
    
      useEffect(() => {
        fetchMovies(currentPageNo);
      }, []);
    return (
        <>
        {
                  isLoading === true ? <ActorLoading /> :
                  <div className="space-y-3 p-5">
                  {movies.map((movie) => {
                    return <MovieListItem key={movie.id} movie={movie} />;
                  })}
            
                  <NextAndPrevButton
                    className="mt-5"
                    onNextClick={handleOnNextClick}
                    onPrevClick={handleOnPrevClick}
                  />
                </div>
        }
        </>
    
    );
};

export default Movies;