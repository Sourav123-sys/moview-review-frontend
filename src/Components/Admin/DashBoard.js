import React from 'react';
import { useAuth } from '../../Hooks/useTheme';
import { FileUploader } from "react-drag-drop-files";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { toast } from 'react-hot-toast';
import { uploadTrailer } from '../../Api/Movie';
import MovieUpload from './MovieUpload';
const DashBoard = () => {
    const { authInfo } = useAuth() 
    return (
        //  <div>
        //      <h1 className='text-center md:text-2xl lg:text-2xl sm:text-sm mt-10 dark:text-white'> Hi,{authInfo.profile.name}..Manage Your DashBoard</h1>
        //  </div>
        <MovieUpload></MovieUpload>
      
    );
};

export default DashBoard;