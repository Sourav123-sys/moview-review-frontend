import React from 'react';
import { Link } from 'react-router-dom';

const SignIn = () => {
    return (
        <div className='fixed inset-0 bg-slate-900 -z-10 flex justify-center items-center'>

            <div className=' max-w-screen-xl mx-auto'>

                <form className='bg-[#272727] rounded p-6 w-72'>
                    <h1 className='text-xl text-white text-center'>Sign In</h1>

                    <div className='flex flex-col-reverse'>
                       
                        <input type='email' name='email' id='email' className='bg-transparent rounded border-2 border-[#4e4242]  w-full text-lg outline-none focus:border-white p-1 text-white peer transition'
                        placeholder='example@gmail.com'
                        />
                         <label htmlFor='email'
                        className='font-semibold text-[#cfcbcb] peer-focus:text-white transition self-start'>Email</label>
                    </div>
                    <div className='flex flex-col-reverse mt-8'>
                       
                        <input type='password' name='password' id='password' className='bg-transparent rounded border-2 border-[#4e4242]  w-full text-lg outline-none focus:border-white p-1 text-white peer transition'
                        placeholder='********'
                        />
                         <label htmlFor='password'
                        className='font-semibold text-[#cfcbcb] peer-focus:text-white transition self-start'>Password</label>
                    </div>
                    
                    <input type='submit'
                        value='Signin'
                        className='w-full rounded bg-white hover:bg-opacity-90 transition font-semibold text-lg  mt-4 cursor-pointer
                    p-1'/>

                    <div className='flex justify-between'>
                        <Link className='text-gray-400 hover:text-white transition'        to='/forgot-password'>Forgot Password?</Link>
                        <Link className='text-gray-400 hover:text-white transition'
                            to='/signup'>Sign Up</Link>
                       
                        
                    </div>
                </form>
            </div>
            
        </div>
    );
};

export default SignIn;