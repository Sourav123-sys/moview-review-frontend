import React, { useState, createContext } from "react";
import { getMovies } from "../Api/Movie";
import { toast } from "react-hot-toast";


export const MovieContext = createContext();

const limit = 4;
let currentPageNo = 0;


const MoviesProvider = ({ children }) => {

    const [movies, setMovies] = useState([]);
    const [latestUploads, setLatestUploads] = useState([]);
    const [reachedToEnd, setReachedToEnd] = useState(false);

console.log(latestUploads,'latest-uplaods');
    const fetchLatestUploads = async (qty = 5) => {
       
        const res = await getMovies(0, qty);
        const { error, movies } = res.data

        if (error) {
            toast.error(error)
        }
        setLatestUploads([...movies]);
      };
      
      const fetchMovies = async (pageNo=currentPageNo) => {
        const res = await getMovies(pageNo, limit);
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
    const fetchNextPage = () => {
        if (reachedToEnd) return;
        currentPageNo += 1;
        fetchMovies(currentPageNo);
      };
    
      const fetchPrevPage = () => {
        if (currentPageNo <= 0) return;
        if (reachedToEnd) setReachedToEnd(false);
    
        currentPageNo -= 1;
        fetchMovies(currentPageNo);
    };
    return (
        <MovieContext.Provider
          value={{
            movies,
            latestUploads,
            fetchLatestUploads,
            fetchMovies,
            fetchNextPage,
            fetchPrevPage,
          }}
        >
          {children}
        </MovieContext.Provider>
      );
}

export default MoviesProvider