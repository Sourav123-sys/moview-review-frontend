import React from 'react';
import { useAuth } from '../../Hooks/Hooks';
import { FileUploader } from "react-drag-drop-files";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { toast } from 'react-hot-toast';
import { uploadTrailer } from '../../Api/Movie';
import MovieUpload from './MovieUpload';


let timeoutId;
const debounce = (func, delay) => {
  return (...args) => {
    if (timeoutId) clearTimeout();
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

const DashBoard = () => {
    const { authInfo } = useAuth()
    const search = (value) => {
       //console.log(value,"search value");
      };
      const debounceSearch = debounce(search, 500);
    
      const handleChange = ({ target }) => {
        debounceSearch(target.value);
      };
    return (
        //  <div>
        //      <h1 className='text-center md:text-2xl lg:text-2xl sm:text-sm mt-10 dark:text-white'> Hi,{authInfo.profile.name}..Manage Your DashBoard</h1>
        //  </div>
        <div className="p-14">
      <input
        onChange={handleChange}
        type="text"
        className="border border-gray-500"
      />
    </div>
     //   <MovieUpload></MovieUpload>
      
    );
};

export default DashBoard;