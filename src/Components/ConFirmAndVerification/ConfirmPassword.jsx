import React from 'react';
import { Link } from 'react-router-dom';

const ConfirmPassword = () => {
    return (
        <div className='fixed inset-0 dark:bg-slate-900 -z-10 flex justify-center items-center'>

        <div className=' max-w-screen-xl mx-auto'>

            <form className='dark:bg-[#272727] bg-white drop-shadow-lg rounded p-6 w-72'>
                <h1 className='text-xl dark:text-white text-gray-900 text-center'>Confirm your Password</h1>

               
               
                <div className='flex flex-col-reverse mt-4'>
                   
                    <input type='newPassword' name='newPassword' id='newPassword' className='bg-transparent rounded border-2 border-[#ae9e9e]  w-full text-lg outline-none focus:border-[#514747] p-1 dark:text-white peer  dark:focus:border-white  text-black peer transition'
                    placeholder='******'
                    />
                     <label htmlFor='newPassword'
                    className='font-semibold dark:text-[#5a5151] text-[#9d9696] dark:peer-focus:text-white peer-focus:text-[#514747] transition self-start'>New Password</label>
                </div>
                <div className='flex flex-col-reverse mt-4'>
                   
                    <input type='confirmPassword' name='confirmPassword' id='confirmPassword' className='bg-transparent rounded border-2 border-[#ae9e9e]  w-full text-lg outline-none focus:border-[#514747] p-1 dark:text-white peer  dark:focus:border-white  text-black peer transition'
                    placeholder='******'
                    />
                     <label htmlFor='confirmPassword'
                    className='font-semibold dark:text-[#5a5151] text-[#9d9696] dark:peer-focus:text-white peer-focus:text-[#514747] transition self-start'>Confirm Password</label>
                </div>
                
                
                <input type='submit'
                    value='confirm'
                    className='w-full rounded text-white dark:text-[#272727] dark:bg-[#ebdfdf]  bg-[#5a5252] hover:bg-opacity-90 dark:hover:bg-opacity-90 transition font-semibold text-lg  mt-4 cursor-pointer
                p-1'/>

             
            </form>
        </div>
        
    </div>
    );
};

export default ConfirmPassword;