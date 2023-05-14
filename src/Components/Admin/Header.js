import React from 'react';
import { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai'


import { BsFillSunFill } from 'react-icons/bs'
import { useTheme } from '../../Hooks/useTheme';
const Header = () => {
    const { toggleTheme } = useTheme()
    const [options, setOptions] = useState(false)





    return (
        <div className='flex items-center justify-between relative'>
            <input type='text' className='bg-transparent rounded border-2 border-[#ae9e9e]  text-lg outline-none focus:border-[#514747] p-1  peer  dark:focus:border-[#886b6b]  text-black dark:text-white peer transition'
                placeholder='Search Movies...'

            />
            <div className='flex items-center space-x-3'>

                <button

                    onClick={() => setOptions(!options)}
                    className='flex items-center space-x-2 border-[#ae9e9e] hover:border-[#945252] dark:text-[#4808de] text-[#570707] hover:opacity-80 transition font-semibold border-2 rounded text-lg px-3 py-1'>
                    <span >Create</span>

                    <AiOutlinePlus></AiOutlinePlus>
                </button>

                <button
                    onClick={toggleTheme}
                    className=' p-2 rounded'>
                    <BsFillSunFill className='text-black dark:text-white' size={26}></BsFillSunFill>
                </button>
            </div>

            {
                options ?

                    <div className='absolute right-0 top-12 flex flex-col space-y-3 p-5
             dark:bg-[#4d4141]  bg-white drop-shadow-lg rounded  animate-scale 
               '>
                        <button className='dark:text-white text-black hover:opacity-80 transition'>Add Movie</button>
                        <button className='dark:text-white text-black hover:opacity-80 transition'>Add Actor</button>
                    </div>
                    : null
            }



        </div>

    );
};

export default Header;