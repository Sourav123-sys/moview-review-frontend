import React from 'react';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovieForAdmin } from '../../Api/Movie';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import MovieListItem from './MovieListItem';

const SearchMovies = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("title");
    const [movies, setMovies] = useState([]);
    const searchMovies = async (value) => {
        const res = await searchMovieForAdmin(value);
      
        const { results } = res.data
        console.log(results,"results");
        if (results.length<1) {
         
            toast.error("The film isn't available yet!!")
        }
        setMovies([...results]);
      };
  
    useEffect(() => {
      if (query.trim()) searchMovies(query);
    }, [query]);
    return (
        <div className="p-5 space-y-3">
      {movies.map((movie) => {
        return <MovieListItem movie={movie} key={movie.id} />;
      })}
    </div>
    );
};

export default SearchMovies;