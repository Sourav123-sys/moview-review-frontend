import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import TagsInput from './TagsInput';
import LiveSearch from './LiveSearch';

const MovieForm = () => {
    const [results,setResults] = useState()
    console.log(results,'results from movie form')
    const { register, reset, trigger, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = async (data) => {

        console.log(data, 'data from movie form');



    }

    useEffect(() => {
        fetch('fakeData.json')
            .then(response => response.json())
            .then(data => setResults(data))

    }, [])

    const renderItem = (result) => {
        return (
          <div className="flex rounded overflow-hidden">
            <img src={result.avatar} alt="" className="w-16 h-16 object-cover" />
            <p className="dark:text-white font-semibold">{result.name}</p>
          </div>
        );
      };


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

                <div>
                    <label
                        className="dark:text-slate-500 text-slate-900 font-semibold"
                        htmlFor="tags">Tags</label>
                    <TagsInput />
                </div>
                <LiveSearch
          results={results}
      
          renderItem={renderItem}
          onSelect={(result) => console.log(result)}
        />

            </div>


            <div className="w-[30%] h-5 bg-blue-400"></div>




        </form>
    );
};

export default MovieForm;