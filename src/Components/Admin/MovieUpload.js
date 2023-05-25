import React, { useState } from 'react';
import { useAuth } from '../../Hooks/useTheme';
import { FileUploader } from "react-drag-drop-files";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { toast } from 'react-hot-toast';
import { uploadTrailer } from '../../Api/Movie';
import { useForm } from 'react-hook-form';
import MovieForm from './MovieForm';
import ModalContainer from './Modals/ModalContainer';



const MovieUpload = ({ width, message, visible, onClose  }) => {
    const { authInfo } = useAuth()
    const { register, reset, trigger, handleSubmit, watch, formState: { errors } } = useForm();
    const [uploadProgress, setUploadProgress] = useState(0)
    const [videoUploaded, setVideoUploaded] = useState(false)
    const [videoSelected, setVideoSelected] = useState(false);
    const [videoInfo, setVideoInfo] = useState({});
    const [movieInfo, setMovieInfo] = useState({
        title: "",
        storyLine: "",
        tags: [],
        cast: [],
        director: {},
        writers: [],
        releaseDate: "",
        poster: null,
        genres: [],
        type: "",
        language: "",
        status: "",
        trailer: {
            url: "",
            public_id: "",
        },
    });
    console.log(videoInfo, 'video info')
    console.log(movieInfo, 'movieInfo')
    const handleUploadTrailer = async (data) => {
        const resUploadTrailer = await uploadTrailer(
            data,
            setUploadProgress
        );
        console.log(resUploadTrailer, 'resUploadTrailer')
        if (resUploadTrailer.data.error) {
            toast.error(resUploadTrailer.data.error)
        }

        const url = resUploadTrailer.data.url
        const public_id = resUploadTrailer.data.public_id
        setVideoUploaded(true);
        setVideoInfo({ url, public_id });

    };
    const handleChange = async (file) => {
        console.log(file);
        const formData = new FormData()

        formData.append('video', file)
        console.log(formData, 'formData ')

        const res = await uploadTrailer(formData, setUploadProgress)
        if (!res.error) {
            setVideoUploaded(true)

        }
        const url = res.data.url
        const public_id = res.data.public_id


        handleUploadTrailer(formData);
        console.log(res, 'res from dashboard')
        console.log(public_id, 'public id from dashboard')
        console.log(url, 'url from dashboard')

    };
    const handleTypeError = (error) => {
        toast.error(error);
    };
    const styles = {
        progressWidth: {
            width: `${uploadProgress}%`
        }
    };
    let progressMsg;
    if (!videoUploaded && uploadProgress >= 100) {
        progressMsg = <p className='font-semibold dark:text-slate-500 text-black animate-pulse mt-1'>processing...</p>
    }
    else {
        progressMsg = <p className='font-semibold dark:text-slate-500 text-black animate-pulse mt-1'>upload progress {uploadProgress}%</p>
    }
    const getUploadProgressValue = () => {
        if (!videoUploaded && uploadProgress >= 100) {
          return "Processing";
        }
    
        return `Upload progress ${uploadProgress}%`;
      };

    return (

      <ModalContainer visible={visible} onClose={onClose}>
    

      <MovieForm />
    </ModalContainer>




      



                
                
          




      
    );
};



const TrailerSelector = ({ visible, handleChange, onTypeError }) => {
  if (!visible) return null;

  return (
    <div className="h-full flex items-center justify-center">
      <FileUploader
        handleChange={handleChange}
        onTypeError={onTypeError}
        types={["mp4", "avi"]}
      >
        <div className="w-48 h-48 border border-dashed dark:border-dark-subtle border-light-subtle rounded-full flex flex-col items-center justify-center dark:text-dark-subtle text-secondary cursor-pointer">
          <AiOutlineCloudUpload size={80} />
          <p>Drop your file here!</p>
        </div>
      </FileUploader>
    </div>
  );
};

const UploadProgress = ({ width, message, visible }) => {
  if (!visible) return null;

  return (
    <div className="dark:bg-secondary bg-white drop-shadow-lg rounded p-3">
      <div className="relative h-3 dark:bg-dark-subtle bg-light-subtle overflow-hidden">
        <div
          style={{ width: width + "%" }}
          className="h-full absolute left-0 dark:bg-white bg-secondary"
        />
      </div>
      <p className="font-semibold dark:text-dark-subtle text-light-subtle animate-pulse mt-1">
        {message}
      </p>
    </div>
  );
};
export default MovieUpload;