import React, { useState,useRef, useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai'
const TagsInput = ({name,onChange }) => {


    const [tag, setTag] = useState("");
    const [tags, setTags] = useState([]);
  console.log(tags,'tags')
    console.log(tag, 'tag')
    
    const input = useRef();
    const tagsInput = useRef();
    const handleOnChange = ({ target }) => {
      const { value } = target;

      if (value !== ",") setTag(value);
     
    };
    useEffect(() => {
      onChange(tags)
   }, [tags])
    const handleKeyDown = ({ key }) => {
      if (key === "," || key === "Enter") {
        if (!tag) return;
  
        if (tags.includes(tag)) return setTag("");
  
        setTags([...tags, tag]);
        setTag("");
        }
        
        if (key === "Backspace" && !tag && tags.length) {
            const newTags = tags.filter((_, index) => index !== tags.length - 1);
            setTags([...newTags]);
          }
    };
    const removeTag = (tagToRemove) => {
        const newTags = tags.filter((tag) => tag !== tagToRemove);
        setTags([...newTags]);
      };
    const Tag = ({ children, onClick }) => {
        return (
          <span className="dark:bg-white bg-slate-800 dark:text-black text-white
            
          flex items-center space-x-3 px-1 whitespace-nowrap">
            {children}
            <button onClick={onClick} type="button">
              <AiOutlineClose size={12} />
            </button>
          </span>
        );
    };
    
    useEffect(() => {
        input.current?.scrollIntoView(false);
    }, [tag]);
    

    const handleOnFocus = () => {
        tagsInput.current.classList.remove(
          "dark:border-dark-subtle",
          "border-light-subtle"
        );
        tagsInput.current.classList.add("dark:border-white", "border-primary");
      };
    
      const handleOnBlur = () => {
        tagsInput.current.classList.add(
          "dark:border-dark-subtle",
          "border-light-subtle"
        );
        tagsInput.current.classList.remove("dark:border-white", "border-primary");
      };

    return (

        <div
        ref={tagsInput}
        onKeyDown={handleKeyDown}
            
            className="border-2 bg-transparent dark:border-[#125050] border-[#309e9e] px-2 h-10 rounded w-full text-white flex items-center space-x-2 overflow-auto
            
            custom-scroll-bar transition
            ">
          
            {tags.map((t) => (
                <Tag onClick={() => removeTag(t)} key={t} >{t}</Tag>
        ))}
            <input
            ref={input}
                value={tag}
                onChange={handleOnChange}
                onFocus={handleOnFocus}
                onBlur={handleOnBlur}
                className="h-full flex-grow text-black
                bg-transparent outline-none dark:text-white"
            placeholder="Tag one, Tag two"/>
        </div>

    );
};

export default TagsInput;


// {
//     uploadProgress >= 100 ? <p className='font-semibold dark:text-[#07dede] text-black animate-pulse mt-10 text-center'>Video Uploaded successfully...</p>
//         :
//         <>
//             <div className='p-2'>
//                 <div className='dark:bg-[#171818] bg-white drop-shadow-lg p-3'>
//                     <div className="h-3 dark:bg-[#214141] bg-[#487171] relative">
//                         <div
//                             style={styles.progressWidth}
//                             className="h-full  dark:bg-[#13caca] bg-[#57b1b1] absolute left-0" >

//                         </div>

//                     </div>
//                     {/* <p className='font-semibold dark:text-slate-500 text-black animate-pulse mt-1'>Upload progress 80%</p> */}
//                     {progressMsg}
//                 </div>
//             </div>

//             <div className="h-full flex items-center justify-center">
//                 <FileUploader

//                     handleChange={handleChange}
//                     onTypeError={handleTypeError}
//                     types={["mp4", "avi"]}
//                 >
//                     <div className="w-48 h-48 border border-dashed border-[#0f52c5]  dark:border-[#4a638d]  rounded-full flex flex-col items-center justify-center dark:text-white text-black cursor-pointer">
//                         <AiOutlineCloudUpload size={80} />
//                         <p>Drop your file here!</p>
//                     </div>
//                 </FileUploader>
//             </div>
//         </>
// } 