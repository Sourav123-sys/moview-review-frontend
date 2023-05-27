import React from 'react';
import PosterSelector from './PosterSelector';
import { useState } from 'react';
import Selector from './Selector';
import { toast } from 'react-hot-toast';
import { ImSpinner3 } from "react-icons/im";

const defaultActorInfo = {
    name: "",
    about: "",
    avatar: null,
    gender: "",
};
const genderOptions = [
    { title: "Male", value: "male" },
    { title: "Female", value: "female" },
    { title: "Other", value: "other" },
];
const ActorForm = ({ title, btnTitle, onSubmit,busy }) => {
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
       //console.log(actorInfo, "actorInfo");
        const name = e.target?.name?.value;
        const about = e.target?.about?.value;
        const avatar = e.target?.avatar?.value;
        const gender = e.target?.gender?.value;

        if (!name) {
            return toast.error("Name is missing")
        }
        else if (!about) {
            return toast.error("About is missing")
        }
        else if (!avatar) {
            return toast.error("Avatar is missing")
        }
        else if (!gender) {
            return toast.error("Gender is missing")
        }

        else {
            const formData = new FormData();
            for (let key in actorInfo) {
                if (key) formData.append(key, actorInfo[key]);
            }
            onSubmit(formData);
           //console.log(formData,"submit-formData");
        }
    };

    const { name, about, gender } = actorInfo;
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
          {busy ? <ImSpinner3 className="animate-spin" /> : btnTitle}
        </button>
            </div>

            <div className="flex space-x-2">
                <PosterSelector
                    selectedPoster={selectedAvatarForUI}
                    className="w-36 h-36 aspect-square object-cover"
                    name="avatar"
                    onChange={handleChange}
                    label="Select avatar"
                    accept="image/jpg, image/jpeg, image/png"
                />
                <div className="flex-grow flex flex-col space-y-2">
                    <input
                        placeholder="Enter name"
                        type="text"
                        className="w-full bg-transparent outline-none dark:border-dark-subtle border-light-subtle dark:focus:border-white focus:border-primary transition dark:text-white text-primary border-b-2"
                        name="name"
                        value={name}
                        onChange={handleChange}
                    />
                    <textarea
                        name="about"
                        value={about}
                        onChange={handleChange}
                        placeholder="About"
                        className="w-full bg-transparent outline-none dark:border-dark-subtle border-light-subtle dark:focus:border-white focus:border-primary transition dark:text-white text-primary border-b-2 resize-none h-full"
                    ></textarea>
                </div>
            </div>

            <div className="mt-3">
                <Selector
                    options={genderOptions}
                    label="Gender"
                    value={gender}
                    onChange={handleChange}
                    name="gender"
                />
            </div>
        </form>
    );
};

export default ActorForm;