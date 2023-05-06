import React from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
    return (
        <div className='fixed inset-0  dark:bg-slate-900 -z-10 flex justify-center items-center'>

            <div className=' max-w-screen-xl mx-auto'>

                <form className='dark:bg-[#272727] bg-white drop-shadow-lg rounded p-6 w-72'>
                    <h1 className='text-xl dark:text-white text-gray-900 text-center'>Sign Up</h1>

                    <div className='flex flex-col-reverse mt-4'>
                       
                       <input type='name' name='name' id='name' className='bg-transparent rounded border-2 border-[#ae9e9e]  w-full text-lg outline-none focus:border-[#514747] p-1 dark:text-white peer  dark:focus:border-white  text-black peer transition'
                       placeholder='example'
                       />
                        <label htmlFor='name'
                       className='font-semibold dark:text-[#5a5151] text-[#9d9696] dark:peer-focus:text-white peer-focus:text-[#514747] transition self-start'>Name</label>
                   </div>
                    <div className='flex flex-col-reverse mt-4'>
                       
                       <input type='email' name='email' id='email' className='bg-transparent rounded border-2 border-[#ae9e9e]  w-full text-lg outline-none focus:border-[#514747] p-1 dark:text-white peer  dark:focus:border-white  text-black peer transition'
                       placeholder='example@gmail.com'
                       />
                        <label htmlFor='email'
                       className='font-semibold dark:text-[#5a5151] text-[#9d9696] dark:peer-focus:text-white peer-focus:text-[#514747] transition self-start'>Email</label>
                   </div>
                   <div className='flex flex-col-reverse mt-4'>
                      
                       <input type='password' name='password' id='password' className='bg-transparent rounded border-2 border-[#ae9e9e]  w-full text-lg outline-none focus:border-[#514747] p-1 dark:text-white peer  dark:focus:border-white  text-black peer transition'
                       placeholder='******'
                       />
                        <label htmlFor='password'
                       className='font-semibold dark:text-[#5a5151] text-[#9d9696] dark:peer-focus:text-white peer-focus:text-[#514747] transition self-start'>Password</label>
                   </div>
                   
                   
                   <input type='submit'
                       value='Signup'
                       className='w-full rounded text-white dark:text-[#272727] dark:bg-[#ebdfdf]  bg-[#5a5252] hover:bg-opacity-90 dark:hover:bg-opacity-90 transition font-semibold text-lg  mt-4 cursor-pointer
                   p-1'/>

           
                    <div className='mt-2'>
                        <p className='text-[#a39292]  hover:text-black dark:hover:text-white'>Already Have an account?</p>
                        <Link to='/signin' className='text-[#a58484]  rounded dark:hover:text-white hover:text-black  transition hover:border-2 border-black px-2' href='#'>Sign In</Link>


                    </div>

                </form>
            </div>

        </div>
    );
};

export default Signup;