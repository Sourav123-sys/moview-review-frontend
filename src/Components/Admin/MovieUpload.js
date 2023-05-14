import React, { useState } from 'react';
import { useAuth } from '../../Hooks/useTheme';
import { FileUploader } from "react-drag-drop-files";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { toast } from 'react-hot-toast';
import { uploadTrailer } from '../../Api/Movie';
import { useForm } from 'react-hook-form';
import MovieForm from './MovieForm';



const MovieUpload = ({ width, message }) => {
    const { authInfo } = useAuth()
    const { register, reset, trigger, handleSubmit, watch, formState: { errors } } = useForm();
    const [uploadProgress, setUploadProgress] = useState(0)
    const [videoUploaded, setVideoUploaded] = useState(false)

    const [videoInfo, setVideoInfo] = useState({});
    const [movieInfo, setMovieInfo] = useState({
        title: "",
        storyLine: "",
        tags: [],
        cast: [],
        director: {},
        writers: [],
        releseDate: "",
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


    return (

        <div className='fixed inset-0 bg-slate-900 dark:bg-white dark:bg-opacity-50 bg-opacity-50 backdrop-blur-sm
        flex items-center justify-center 
        '>

            <div className='bg-white dark:bg-slate-900 rounded w-[45rem] h-[40rem]'>
  

                
        




                <MovieForm />
            </div>




        </div>
    );
};

export default MovieUpload;