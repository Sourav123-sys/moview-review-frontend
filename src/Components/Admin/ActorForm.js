import React from 'react';
import PosterSelector from './PosterSelector';
import { useState } from 'react';


const defaultActorInfo = {
    name: "",
    about: "",
    avatar: null,
  };
const ActorForm = ({ title, btnTitle }) => {
    const [actorInfo, setActorInfo] = useState({ ...defaultActorInfo });
    const [selectedAvatarForUI, setSelectedAvatarForUI] = useState("");
  
    const updatePosterForUI = (file) => {
      const url = URL.createObjectURL(file);
      setSelectedAvatarForUI(url);
    };
  
    const handleChange = ({ target }) => {
      const { value, files, name } = target;
      if (name === "avatar") {
        const file = files[0];
        updatePosterForUI(file);
        return setActorInfo({ ...actorInfo, avatar: file });
      }
  
      setActorInfo({ ...actorInfo, [name]: value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(actorInfo);
    };
  
    const { name, about } = actorInfo;
    return (
        <form
        className="dark:bg-primary bg-white p-3 w-[35rem] rounded"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-between items-center mb-3">
          <h1 className="font-semibold text-xl dark:text-white text-primary">
            {title}
          </h1>
          <button
            className="h-8 w-24 bg-primary text-white dark:bg-white dark:text-primary hover:opacity-80 transition rounded flex items-center justify-center"
            type="submit"
          >
            {btnTitle}
          </button>
        </div>
  
        <div className="flex space-x-2">
          <PosterSelector
            selectedPoster={selectedAvatarForUI}
            className="w-36 h-36 aspect-square object-cover"
            name="avatar"
            onChange={handleChange}
            lable="Select avatar"
            accept="image/jpg, image/jpeg, image/png"
          />
          <div className="flex-grow flex flex-col space-y-2">
            <input
              placeholder="Enter name"
              type="text"
              className= "w-full bg-transparent outline-none dark:border-dark-subtle border-light-subtle dark:focus:border-white focus:border-primary transition dark:text-white text-primary border-b-2"
              name="name"
              value={name}
              onChange={handleChange}
            />
            <textarea
              name="about"
              value={about}
              onChange={handleChange}
              placeholder="About"
              className= "w-full bg-transparent outline-none dark:border-dark-subtle border-light-subtle dark:focus:border-white focus:border-primary transition dark:text-white text-primary border-b-2 resize-none h-full"
            ></textarea>
          </div>
        </div>
      </form>
    );
};

export default ActorForm;