import React, { useEffect, useRef, useState, forwardRef } from "react";

const LiveSearch = ({
    value = "",
    placeholder = "",
    results = [],
    resultContainerStyle,
    selectedResultStyle,
    inputStyle,
    renderItem = null,
    onChange = null,
    onSelect = null,
  }) => {

   // const [results, setResults] = useState([])
   // console.log(results, 'results')
    const [displaySearch, setDisplaySearch] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState(-1);

    const handleOnFocus = () => {
        if (results.length) setDisplaySearch(true);
    };
    const closeSearch = () => {
        setDisplaySearch(false);
        setFocusedIndex(-1);
    };
    const handleOnBlur = () => {
        setDisplaySearch(false);
        setFocusedIndex(-1);
    };



    const handleSelection = (selectedItem) => {
        console.log(selectedItem);
    };

    const handleKeyDown = ({ key }) => {
        let nextCount;
        const keys = ["ArrowDown", "ArrowUp", "Enter", "Escape"];
        if (!keys.includes(key)) return;

        // move selection up and down
        if (key === "ArrowDown") {
            nextCount = (focusedIndex + 1) % results.length;
        }
        if (key === "ArrowUp") {
            nextCount = (focusedIndex + results.length - 1) % results.length;
        }
        if (key === "Enter") return handleSelection(results[focusedIndex]);
        setFocusedIndex(nextCount);
    };
    const getInputStyle = () => {
        return inputStyle
          ? inputStyle
          :  "w-full bg-transparent outline-none dark:border-dark-subtle border-light-subtle dark:focus:border-white focus:border-primary transition dark:text-white text-primaryw-full bg-transparent outline-none dark:border-dark-subtle border-light-subtle dark:focus:border-white focus:border-primary transition dark:text-white text-primary border-2 rounded p-1 text-lg";
      };
    return (
        <div

            tabIndex={1}
            onKeyDown={handleKeyDown}
            onBlur={handleOnBlur}
            className="relative">
            <input
                type="text"
                className={"w-full bg-transparent outline-none dark:border-dark-subtle border-light-subtle dark:focus:border-white focus:border-primary transition dark:text-white text-primary border-2 rounded p-1 text-lg"}

                placeholder="Search profile..."
                // onKeyDown={handleKeyDown}
                onFocus={handleOnFocus}
            // onBlur={handleOnBlur}
            />
            <SearchResults
                   results={results}
                   visible={displaySearch}
                   focusedIndex={focusedIndex}
                   onSelect={handleSelection}
                   renderItem={renderItem}
                   resultContainerStyle={resultContainerStyle}
                   selectedResultStyle={selectedResultStyle}
         
            
            />
        </div>
    );
};

const renderItem = ({ id, name, avatar }) => {
    return (<div className="flex">
        <img src={avatar} alt="" />
        <p>{name}</p>
    </div>
    );
};

const SearchResults = ({
    visible,
  results = [],
  focusedIndex,
  onSelect,
  renderItem,
  resultContainerStyle,
  selectedResultStyle,
}) => {

    const resultContainer = useRef();

    useEffect(() => {
        resultContainer.current?.scrollIntoView({
            behavior: "smooth",
            block: "center",
        });
    }, [focusedIndex]);

    if (!visible) return null;

    return (
        <div className="absolute right-0 left-0 top-10 bg-white dark:bg-secondary shadow-md p-2 max-h-64 space-y-2 mt-1 overflow-auto custom-scroll-bar-live">
              {results.map((result, index) => {
        const getSelectedClass = () => {
          return selectedResultStyle
            ? selectedResultStyle
            : "dark:bg-dark-subtle bg-light-subtle";
        };
        return (
          <ResultCard
            key={result.id}
            item={result}
            renderItem={renderItem}
            resultContainerStyle={resultContainerStyle}
            selectedResultStyle={
              index === focusedIndex ? getSelectedClass() : ""
            }
            onMouseDown={() => onSelect(result)}
          />
        );
      })}
        </div>
    );
};


const ResultCard = forwardRef((props, ref) => {
    const {
      item,
      renderItem,
      resultContainerStyle,
      selectedResultStyle,
      onMouseDown,
    } = props;
  
    const getClasses = () => {
      if (resultContainerStyle)
        return resultContainerStyle + " " + selectedResultStyle;
  
      return (
        selectedResultStyle +
        " cursor-pointer rounded overflow-hidden dark:hover:bg-dark-subtle hover:bg-light-subtle transition"
      );
    };
    return (
      <div onMouseDown={onMouseDown} ref={ref} className={getClasses()}>
        {renderItem(item)}
      </div>
    );
  });


export default LiveSearch;