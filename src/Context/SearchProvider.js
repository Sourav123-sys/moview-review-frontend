import React, { createContext, useState } from "react";
import { toast } from "react-hot-toast";


export const SearchContext = createContext();

let timeoutId;
const debounce = (func, delay) => {
    return (...args) => {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(null, args);
        }, delay);
    };
};

export default function SearchProvider({ children }) {
    const [searching, setSearching] = useState(false);
    const [results, setResults] = useState([]);
    const [resultNotFound, setResultNotFound] = useState(false);

console.log(results,"resultsActor");

    const search = async (method, query,updaterFun) => {
        const res = await method(query);
        
        
        
        const resultsActor = res.data.results
        console.log(resultsActor,"resultsActor");
        if (resultsActor.length<1 ) {
            return toast.error("Can't find  with this name");
        }

        
        if (!resultsActor.length) return setResultNotFound(true);
        setResults(resultsActor);
        updaterFun && updaterFun([...results]);
    };

    const debounceFunc = debounce(search, 700);

    const handleSearch = (method, query, updaterFun) => {
        setSearching(true);
        if (!query.trim()) {
            updaterFun && updaterFun([]);
          resetSearch();
        }
    
        debounceFunc(method, query, updaterFun);
      };
    const resetSearch = () => {
        setSearching(false);
        setResults([]);
        setResultNotFound(false);
      };
    return (
        <SearchContext.Provider
        value={{ handleSearch, resetSearch, searching, resultNotFound, results }}
        >
            {children}
        </SearchContext.Provider>
    );
}
