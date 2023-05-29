import React from 'react';
import LiveSearch from './LiveSearch';
import { renderItem } from '../../Utilities/Common';
import { useState } from 'react';
import { useSearch } from '../../Hooks/Hooks';
import { searchActor } from '../../Api/Actor';

const WriterSelector = ({ onSelect }) => {
    const [value, setValue] = useState("");
    const [profiles, setProfiles] = useState([]);
  
    const { handleSearch, resetSearch } = useSearch();
  
    const handleOnChange = ({ target }) => {
      const { value } = target;
      setValue(value);
      handleSearch(searchActor, value, setProfiles);
    };
  
    const handleOnSelect = (profile) => {
      setValue(" ");
      onSelect(profile);
      setProfiles([]);
      resetSearch();
    };
    return (
        <LiveSearch
        name="writers"
        placeholder="Search profile"
        results={profiles}
        renderItem={renderItem}
        onSelect={handleOnSelect}
        onChange={handleOnChange}
        value={value}
      />

    );
};

export default WriterSelector;