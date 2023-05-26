
import React from 'react';
import { useState } from 'react';
import LiveSearch from "./LiveSearch";

import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { renderItem } from '../../Utilities/Common';
import { useSearch } from '../../Hooks/Hooks';
import { searchActor } from '../../Api/Actor';


const defaultCastInfo = {
  profile: {},
  roleAs: "",
  leadActor: false,
};

const CastForm = ({ onSubmit }) => {
  const [castInfo, setCastInfo] = useState({ ...defaultCastInfo });
  const [profiles, setProfiles] = useState([]);
  const { handleSearch, resetSearch } = useSearch();

  console.log(castInfo,"castInfo");
  console.log(profiles,"castInfo-profiles");
  //  const [results, setResults] = useState()

  // useEffect(() => {
  //     fetch('fakeData.json')
  //         .then(response => response.json())
  //         .then(data => setResults(data))

  // }, [])
  const handleOnChange = ({ target }) => {
    const { checked, name, value } = target;

    if (name === "leadActor")
      return setCastInfo({ ...castInfo, leadActor: checked });

    setCastInfo({ ...castInfo, [name]: value });
  };

  const handleProfileSelect = (profile) => {
    setCastInfo({ ...castInfo, profile });
  };


  const handleSubmit = () => {
    const { profile, roleAs } = castInfo;
    if (!profile.name) {
      return toast.error("Cast profile is missing!");
    }

    else if (!roleAs.trim()) {
      return toast.error("Cast role is missing!");
    }

    else {
      onSubmit(castInfo);
      setCastInfo({ ...defaultCastInfo, profile: { name: "" } });

      resetSearch()
      
      
    }

  };
  const handleProfileChange = ({ target }) => {
    const { value } = target;
    const { profile } = castInfo;
    profile.name = value;
    setCastInfo({ ...castInfo, ...profile });
    handleSearch(searchActor, value, setProfiles);
  };
  const { leadActor, profile, roleAs } = castInfo;
  console.log(leadActor, profile, roleAs, "leadActor-profile-roleas")


  return (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        name="leadActor"
        className="w-4 h-4"
        checked={leadActor}
        onChange={handleOnChange}
        title="Set as lead actor"
      />
      <LiveSearch
        placeholder="Search profile"
        value={profile.name}
        results={profiles}
        onSelect={handleProfileSelect}
        renderItem={renderItem}
        onChange={handleProfileChange}
      />
      <span className="dark:text-dark-subtle text-light-subtle font-semibold">
        as
      </span>

      <div className="flex-grow">
        <input
          type="text"
          className="w-full bg-transparent outline-none dark:border-dark-subtle border-light-subtle dark:focus:border-white focus:border-primary transition dark:text-white text-primary rounded p-1 text-lg border-2"
          placeholder="Role as"
          name="roleAs"
          value={roleAs}
          onChange={handleOnChange}
        />
      </div>

      <button
        onClick={handleSubmit}
        type="button" className="bg-secondary dark:bg-white dark:text-primary text-white px-1 rounded">
        Add
      </button>
    </div>
  );
};

export default CastForm;