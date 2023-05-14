import React from 'react';
import { useForm } from 'react-hook-form';
import TagsInput from './TagsInput';

const MovieForm = () => {
    const { register, reset, trigger, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = async (data) => {

     console.log(data,'data from movie form');

       
       
    }


    return (
        <form
            
        onSubmit={handleSubmit(onSubmit)}
            
            className="flex space-x-3">
            <div className="w-[70%] space-y-5">
                <div>
                    <label
                        htmlFor="title"
                        className="dark:text-slate-500 text-slate-900 font-semibold"
                    >
                        Title
                    </label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        className="w-full bg-transparent outline-none border-b-2 
            dark:border-[#422d2d]  border-[#272727]  dark:focus:border-white focus:border-[#272727] transition font-semibold text-xl dark:text-white text-black"
                        placeholder="Titanic"
                    />
                </div>

                <div>
                    <label
                        htmlFor="storyLine"
                        className="dark:text-slate-500 text-slate-900 font-semibold "
                    >
                        StoryLine
                    </label>
                    <textarea
                        id="storyLine"
                        name="storyLine"
                        type="text"
                        className="w-full bg-transparent outline-none border-b-2 
            dark:border-[#422d2d]  border-[#272727]  dark:focus:border-white focus:border-[#272727] transition font-semibold text-xl dark:text-white text-black
            
            h-24 
            "
                        placeholder="Titanic is a ...."
                    />
                </div>
                <TagsInput />
            </div>
            <div className="w-[30%] h-5 bg-blue-400"></div>


       

        </form>
    );
};

export default MovieForm;