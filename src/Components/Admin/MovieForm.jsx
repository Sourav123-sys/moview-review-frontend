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
import { searchActor } from '../../Api/Actor';
import { useSearch } from '../../Hooks/Hooks';
import { renderItem } from '../../Utilities/Common';
import DirectorSelector from './DirectorSelector';
import WriterSelector from './WriterSelector';
import { validateMovie } from '../../Utilities/Validator';
import Submit from '../../Utilities/Submit';



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

const MovieForm = ({ onSubmit, busy,initialState,btnTitle }) => {
  //const [results, setResults] = useState()
  const [movieInfo, setMovieInfo] = useState({ ...defaultMovieInfo });
  const [showModal, setShowModal] = useState(false);
  const [showCastModal, setShowCastModal] = useState(false);
  const [showWritersModal, setShowWritersModal] = useState(false);
  const [selectedPosterForUI, setSelectedPosterForUI] = useState("");
  const [showGenresModal, setShowGenresModal] = useState(false);
  const [writerName, setWriterName] = useState("");

 //console.log(showCastModal, "showCastModel")
 //console.log(writerName, "writerName");
  //console.log(results, 'results from movie form')


  const { handleSearch, results, resetSearch } = useSearch();
 //console.log(results, "results from movie from for search actor");



  const handleSubmit = (e) => {
    e.preventDefault();
   //console.log("object");
    const { error } = validateMovie(movieInfo);

    if (error) {
      return toast.error(error);
    }
    // cast, tags, genres, writers
    const { tags, genres, cast, writers, director, poster } = movieInfo;

    const formData = new FormData();
    const finalMovieInfo = {
      ...movieInfo,
    };

    finalMovieInfo.tags = JSON.stringify(tags);
    finalMovieInfo.genres = JSON.stringify(genres);

    // {
    //   actor: { type: mongoose.Schema.Types.ObjectId, ref: "Actor" },
    //   roleAs: String,
    //   leadActor: Boolean,
    // },

    const finalCast = cast.map((c) => ({
      actor: c.profile.id,
      roleAs: c.roleAs,
      leadActor: c.leadActor,
    }));
    finalMovieInfo.cast = JSON.stringify(finalCast);

    if (writers.length) {
      const finalWriters = writers.map((w) => w.id);
      finalMovieInfo.writers = JSON.stringify(finalWriters);
    }

    if (director.id) finalMovieInfo.director = director.id;
    if (poster) finalMovieInfo.poster = poster;

    for (let key in finalMovieInfo) {
      formData.append(key, finalMovieInfo[key]);
    }

    onSubmit(formData);
   console.log(formData, "formData");
   console.log(movieInfo, "movieInfo");

  };

  // useEffect(() => {
  //   fetch('fakeData.json')
  //     .then(response => response.json())
  //     .then(data => setResults(data))

  // }, [])


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
   //console.log(profile, 'profile form update director')
    setMovieInfo({ ...movieInfo, director: profile });
    resetSearch();
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
    setWriterName(" ")
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


  useEffect(() => {
    if (initialState) {
      setMovieInfo({
        ...initialState,
        releaseDate: initialState.releaseDate?.split("T")[0],
        poster: null,
      });
      setSelectedPosterForUI(initialState.poster);
    }
  }, [initialState]);


  const { title, storyLine, director, writers, cast, tags, releaseDate, genres, type,
    language, status, } = movieInfo;
 //console.log(movieInfo, 'movieInfo')
  return (
    <>

      <div onSubmit={handleSubmit}
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

          <DirectorSelector onSelect={updateDirector} />

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
            <WriterSelector onSelect={updateWriters} />
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


          <Submit
            busy={busy}
            value={btnTitle}
            onClick={handleSubmit}
            type="button"
          />
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




      </div>

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
      type="button"
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