import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import TagsInput from './TagsInput';
import LiveSearch from './LiveSearch';
import { toast } from 'react-hot-toast';
import ModalContainer from './Modals/ModalContainer';
import WritersModal from './Modals/WritersModal';



const defaultMovieInfo = {
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
};

const MovieForm = () => {
    const [results, setResults] = useState()
    const [movieInfo, setMovieInfo] = useState({ ...defaultMovieInfo });
    const [showModal, setShowModal] = useState(false);
   
    const [showWritersModal, setShowWritersModal] = useState(false);
    //console.log(results, 'results from movie form')
    //const { register, reset, trigger, handleSubmit, watch, formState: { errors } } = useForm();

    // const onSubmit = async (data) => {

    //     console.log(data, 'data from movie form');

    //     toast.success("Movie created successfully")

    // }
    const handleSubmit = (event) => {

        console.log(movieInfo, "data from movie form");

        event.preventDefault()
    };

    useEffect(() => {
        fetch('fakeData.json')
            .then(response => response.json())
            .then(data => setResults(data))

    }, [])
    const hideWritersModal = () => {
        setShowWritersModal(false);
      };
    
    const renderItem = (result) => {
        return (
            <div className="flex rounded overflow-hidden">
                <img src={result.avatar} alt="" className="w-16 h-16 object-cover" />
                <p className="dark:text-white font-semibold">{result.name}</p>
            </div>
        );
    };
    const handleChange = ({ target }) => {
        const { value, name } = target;

        setMovieInfo({ ...movieInfo, [name]: value });
    };

    const updateTags = (tags) => {
        setMovieInfo({ ...movieInfo, tags });
    };
    const updateDirector = (profile) => {
        console.log(profile, 'profile form update director')
        setMovieInfo({ ...movieInfo, director: profile });
    };

    const updateWriters = (profile) => {
        const { writers } = movieInfo;
        for (let writer of writers) {
            if (writer.id === profile.id) {
                return toast.error(
                    'This profile already selected.'
                );
            }
        }
        setMovieInfo({ ...movieInfo, writers: [...writers, profile] });
    };
    const handleWriterRemove = (profileId) => {
        const { writers } = movieInfo;
        const newWriters = writers.filter(({ id }) => id !== profileId);
        if (!newWriters.length) hideWritersModal();
        setMovieInfo({ ...movieInfo, writers: [...newWriters] });
      };
    const { title, storyLine, director, writers } = movieInfo;
    console.log(writers.length,'writers.length')
    return (
        <>
            <form

                onSubmit={handleSubmit}

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
                            onChange={handleChange}
                            name="title"
                            type="text"
                            value={title}

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
                            value={storyLine}
                            onChange={handleChange}
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
                        <TagsInput name='tags' onChange={updateTags} />
                    </div>

                    <div className="">
                        <label htmlFor="director"
                            className="dark:text-slate-500 text-slate-900 font-semibold"
                        >Director</label>
                        <LiveSearch
                            name="director"
                            results={results}
                            placeholder="Search profile"
                            renderItem={renderItem}
                            onSelect={updateDirector}
                            value={director.name}
                        />
                    </div>

                    <div className="">
                        <div className="flex justify-between">
                            <LabelWithBadge badge={writers.length} htmlFor="writers"
                            className="dark:text-slate-500 text-slate-900 font-semibold">
                                Writers
                            </LabelWithBadge>
                            <button
                                type='button'
                onClick={() => setShowWritersModal(true)}
                className="dark:text-white text-primary hover:underline transition"
              >
                View All
              </button>
                        </div>
                        <LiveSearch
                            name="writers"
                            results={results}
                            placeholder="Search profile"
                            renderItem={renderItem}
                            onSelect={updateWriters}
                            value={director.name}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full rounded dark:bg-white bg-secondary dark:text-secondary text-white hover:bg-opacity-90 transition font-semibold text-lg cursor-pointer h-10 flex items-center justify-center"
                    >
                        Upload
                    </button>
                </div>


                <div className="w-[30%] h-5 bg-blue-400">
                    <input type='submit'
                        value='sigin'

                        className='w-full rounded text-white dark:text-[#272727] dark:bg-[#ebdfdf]  bg-[#5a5252] hover:bg-opacity-90 dark:hover:bg-opacity-90 transition font-semibold text-lg  mt-4 cursor-pointer
                p-1'/>


                </div>




            </form>

            <WritersModal
        onClose={() => setShowWritersModal(false)}
        visible={showWritersModal}
                profiles={writers}
                onRemoveClick={handleWriterRemove}
      />
        </>

    );
};
const LabelWithBadge = ({ children, htmlFor, badge = 0 }) => {
    console.log(badge,"badge")
    const renderBadge = () => {
        if (!badge) return null;
        return (
            <span className="dark:bg-dark-subtle bg-light-subtle text-white absolute top-0 ml-12 translate-x-2 -translate-y-1 text-xs w-5 h-5 rounded-full flex justify-center items-center">
                {badge <= 9 ? badge : "9+"}
            </span>
        );
    };

    return (
        <div className="relative">
            <label
            className="dark:text-slate-500 text-slate-900 font-semibold"
                htmlFor={htmlFor}>{children}</label>
            {renderBadge()}
        </div>
    );
};
export default MovieForm;