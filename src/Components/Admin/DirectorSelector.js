import React from 'react';
import LiveSearch from './LiveSearch';
import { useState } from 'react';
import { useSearch } from '../../Hooks/Hooks';
import { searchActor } from '../../Api/Actor';
import { renderItem } from '../../Utilities/Common';


const DirectorSelector = ({ onSelect }) => {
  const [value, setValue] = useState("");
  
    const [profiles, setProfiles] = useState([]);
  
    const { handleSearch, resetSearch } = useSearch();
  
    const handleOnChange = ({ target }) => {
      const { value } = target;
      console.log(value,"value");
      setValue(value);
      handleSearch(searchActor, value, setProfiles);
    };
  
  const handleOnSelect = (profile) => {
      console.log(profile,"profile");
      setValue(profile.name);
      onSelect(profile);
      setProfiles([]);
      resetSearch();
    };
    return (
        <div className="">
            <label htmlFor="director"
              className="dark:text-slate-500 text-slate-900 font-semibold"
            >Director</label>
            <LiveSearch
                name="director"
                value={value}
                placeholder="Search profile"
                results={profiles}
                renderItem={renderItem}
                onSelect={handleOnSelect}
                onChange={handleOnChange}
            />
          </div>
    );
};

export default DirectorSelector;