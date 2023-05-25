import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import TagsInput from './TagsInput';
import LiveSearch from './LiveSearch';
import { toast } from 'react-hot-toast';
import ModalContainer from './Modals/ModalContainer';
import WritersModal from './Modals/WritersModal';
import CastForm from './CastForm';
import CastModal from './Modals/CastModal';
import PosterSelector from './PosterSelector';
import GenresSelector from './GenresSelector';
import GenresModal from './Modals/GenresModal';
import Selector from './Selector';
import { languageOptions, statusOptions, typeOptions } from '../../Utilities/options';



const defaultMovieInfo = {
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
};
export const renderItem = (result) => {
  return (
    <div className="flex rounded overflow-hidden">
      <img src={result.avatar} alt="" className="w-16 h-16 object-cover" />
      <p className="dark:text-white font-semibold">{result.name}</p>
    </div>
  );
};
const MovieForm = () => {
  const [results, setResults] = useState()
  const [movieInfo, setMovieInfo] = useState({ ...defaultMovieInfo });
  const [showModal, setShowModal] = useState(false);
  const [showCastModal, setShowCastModal] = useState(false);
  const [showWritersModal, setShowWritersModal] = useState(false);
  const [selectedPosterForUI, setSelectedPosterForUI] = useState("");
  const [showGenresModal, setShowGenresModal] = useState(false);
  console.log(showCastModal, "showCastModel")
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

  const updatePosterForUI = (file) => {
    const url = URL.createObjectURL(file);
    setSelectedPosterForUI(url);
  };

  const handleChange = ({ target }) => {
    const { value, name, files } = target;
    if (name === "poster") {
      const poster = files[0];
      updatePosterForUI(poster);
      return setMovieInfo({ ...movieInfo, poster });
    }

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
  const hideWritersModal = () => {
    setShowWritersModal(false);
  };
  const displayWritersModal = () => {
    setShowWritersModal(true);
  };

  const handleWriterRemove = (profileId) => {
    const { writers } = movieInfo;
    const newWriters = writers.filter(({ id }) => id !== profileId);
    if (!newWriters.length) hideWritersModal();
    setMovieInfo({ ...movieInfo, writers: [...newWriters] });
  };

  const hideGenresModal = () => {
    setShowGenresModal(false);
  };

  const displayGenresModal = () => {
    setShowGenresModal(true);
  };


  const updateCast = (castInfo) => {
    const { cast } = movieInfo;
    setMovieInfo({ ...movieInfo, cast: [...cast, castInfo] });
  };
  const hideCastModal = () => {
    setShowCastModal(false);
  };

  const displayCastModal = () => {
    setShowCastModal(true);
  };
  const handleCastRemove = (profileId) => {
    const { cast } = movieInfo;
    const newCast = cast.filter(({ profile }) => profile.id !== profileId);
    if (!newCast.length) hideCastModal();
    setMovieInfo({ ...movieInfo, cast: [...newCast] });
  };

  const updateGenres = (genres) => {
    setMovieInfo({ ...movieInfo, genres });
  };
  const { title, storyLine, director, writers, cast, tags, releaseDate, genres,type,
    language,status, } = movieInfo;
  console.log(movieInfo, 'movieInfo')
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
              <LabelWithBadge badge={writers.length} htmlFor="writers">
                Writers
              </LabelWithBadge>
              <ViewAllBtn
                onClick={displayWritersModal}
                visible={writers.length}
              >
                View All
              </ViewAllBtn>
            </div>
            <LiveSearch
              name="writers"
              results={results}
              placeholder="Search profile"
              renderItem={renderItem}
              onSelect={updateWriters}
             
            />
          </div>

          <div>
            <div className="flex justify-between">
              <LabelWithBadgeCast badge={cast.length}>
                Add Cast & Crew
              </LabelWithBadgeCast>
              <ViewAllBtn
                onClick={displayCastModal}
                visible={cast.length}>View All</ViewAllBtn>
            </div>
            <CastForm onSubmit={updateCast} />
          </div>

          <div>
            <label htmlFor="releaseDate"
              className="dark:text-slate-500 text-slate-900 font-semibold"
            >ReleaseDate</label> <br />
            <input
              type="date"
              className="bg-transparent outline-none dark:border-dark-subtle border-light-subtle dark:focus:border-white focus:border-primary transition dark:text-white text-primary border-2 rounded p-1 w-auto"
              onChange={handleChange}
              name="releaseDate"
              value={releaseDate}
            />
          </div>


          <button

            className="w-full rounded dark:bg-white bg-secondary dark:text-secondary text-white hover:bg-opacity-90 transition font-semibold text-lg cursor-pointer h-10 flex items-center justify-center"
          >
            Upload
          </button>
        </div>


        <div className="w-[30%] space-y-5">

          <PosterSelector
            name="poster"
            onChange={handleChange}
            selectedPoster={selectedPosterForUI}
            accept="image/jpg, image/jpeg, image/png"
           label="Select poster"
          />
          <GenresSelector
            badge={genres.length}
            onClick={displayGenresModal} />

<Selector
            onChange={handleChange}
            name="type"
            value={type}
            options={typeOptions}
            label="Type"
          />
          <Selector
            onChange={handleChange}
            name="language"
            value={language}
            options={languageOptions}
            label="Language"
          />
          <Selector
            onChange={handleChange}
            name="status"
            value={status}
            options={statusOptions}
            label="Status"
          />
        </div>




      </form>

      <WritersModal
        onClose={() => setShowWritersModal(false)}
        visible={showWritersModal}
        profiles={writers}
        onRemoveClick={handleWriterRemove}
      />
      <CastModal
        onRemoveClick={handleCastRemove}

        onClose={hideCastModal} casts={cast} visible={showCastModal} />

      <GenresModal
        onSubmit={updateGenres}
        previousSelection={genres}
        visible={showGenresModal} onClose={hideGenresModal} />

    </>

  );
};
const ViewAllBtn = ({ visible, children, onClick }) => {
  if (!visible) return null;
  return (
    <button
      onClick={onClick}
      className="dark:text-white text-primary hover:underline transition"
    >
      {children}
    </button>
  );
};
const LabelWithBadge = ({ children, htmlFor, badge = 0 }) => {
  const renderBadge = () => {
    if (!badge) return null;
    return (
      <span className="dark:bg-dark-subtle bg-light-subtle text-white absolute top-0 ml-12 translate-x-2 -translate-y-1 text-xs w-5 h-5 rounded-full flex justify-center items-center ">
        {badge <= 9 ? badge : "9+"}
      </span>
    );
  };

  return (
    <div className="relative">
      <label className="dark:text-slate-500 text-slate-900 font-semibold" htmlFor={htmlFor}>{children}</label>
      {renderBadge()}
    </div>
  );
};
const LabelWithBadgeCast = ({ children, htmlFor, badge = 0 }) => {
  const renderBadge = () => {
    if (!badge) return null;
    return (
      <span className="dark:bg-dark-subtle bg-light-subtle text-white absolute top-0 ml-36 translate-x-2 -translate-y-1 text-xs w-5 h-5 rounded-full flex justify-center items-center ">
        {badge <= 9 ? badge : "9+"}
      </span>
    );
  };

  return (
    <div className="relative">
      <label className="dark:text-slate-500 text-slate-900 font-semibold" htmlFor={htmlFor}>{children}</label>
      {renderBadge()}
    </div>
  );
};
export default MovieForm;