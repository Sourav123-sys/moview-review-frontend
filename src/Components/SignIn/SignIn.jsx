import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import useTheme, { useAuth } from '../../Hooks/Hooks';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faEye, faEyeSlash, faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import {ImSpinner3, ImSpinner4, ImSpinner9} from "react-icons/im"
const SignIn = () => {

    const { register, reset, trigger, handleSubmit, watch, formState: { errors } } = useForm();
  
    const [show, setShow] = useState(true)

    const navigate = useNavigate()


    const {handleLogin,authInfo}= useAuth()

    const {isPending} = authInfo

console.log(authInfo, 'authInfo')


    const onSubmit = async (data) => {

        ////console.log(data.email, 'data from signin')
        ////console.log(data.password, 'data from signin')
       //console.log(data, 'data from signin')
 handleLogin(data.email, data.password)
       //console.log(authInfo,'error from login')
        reset()

       //  navigate('/email-verification', { state: { user: userFindId }, replace: true })
       
    }

    let emailerrorMsg;

    if (errors?.email?.message) {
        emailerrorMsg = <p className='text-red-700'>Error :{errors?.email?.message}</p>;

    }
    let passworderrorMsg;

    if (errors?.password?.message) {
        passworderrorMsg = <p className='text-red-700'>Error :{errors?.password?.message}</p>;

    }
    return (
        <div className='fixed inset-0 dark:bg-slate-900 -z-10 flex justify-center items-center'>

            <div className=' max-w-screen-xl mx-auto'>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='dark:bg-[#272727] bg-white drop-shadow-lg rounded p-6 w-72'>
                    <h1 className='text-xl dark:text-white text-gray-900 text-center'>Sign In</h1>


                    <div className='relative z-0 flex flex-col-reverse mt-4'>

                        <input

                            type='email' name='email' id='email'
                            {...register("email", {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Please enter a valid Email"
                                }
                            })}
                            //Regex use korte hole pattern likhe object create korte hobe
                            onKeyUp={() => {
                                trigger('email')
                            }}

                            className='bg-transparent rounded border-2 border-[#ae9e9e]  w-full text-lg outline-none focus:border-[#514747] p-1 dark:text-white peer  dark:focus:border-white  text-black peer transition'
                            placeholder='example@gmail.com'
                        />
                        <FontAwesomeIcon className="absolute top-0 left-0 mt-1" icon={faEnvelope} ></FontAwesomeIcon>
                        <label htmlFor='email'
                            className='font-semibold dark:text-[#5a5151] text-[#9d9696] dark:peer-focus:text-white peer-focus:text-[#514747] transition self-start ml-5'>Email</label>
                    </div>
                    {emailerrorMsg}
                    <div className='relative z-0 flex flex-col-reverse mt-4'>

                        <input

                            type={show ? 'password' : "text"} name='password' id='password'
                            {...register('password', {
                                required: 'Password is required',
                         
                            })}
                            onKeyUp={() => {
                                trigger('password')
                            }}
                            className='bg-transparent rounded border-2 border-[#ae9e9e]  w-full text-lg outline-none focus:border-[#514747] p-1 dark:text-white peer  dark:focus:border-white  text-black peer transition'
                            placeholder='******'
                        />

                        {
                            show ?
                                <>
                                    <FontAwesomeIcon className='absolute top-0 right-0 mt-9 px-2' onClick={() => setShow(!show)} icon={faEyeSlash} />
                                    <FontAwesomeIcon className="absolute top-0 left-0 mt-1" icon={faLock} ></FontAwesomeIcon>
                                </>

                                :
                                <>
                                    <FontAwesomeIcon className='absolute top-0 right-0 mt-9 px-2' onClick={() => setShow(!show)} icon={faEye} />
                                    <FontAwesomeIcon className="absolute top-0 left-0 mt-1" icon={faLockOpen} ></FontAwesomeIcon>
                                </>


                        }
                        <label htmlFor='password'
                            className='font-semibold dark:text-[#5a5151] text-[#9d9696] dark:peer-focus:text-white peer-focus:text-[#514747] transition self-start ml-5'>Password</label>
                    </div>
                    {passworderrorMsg}
                    {
                      isPending ?
                            <ImSpinner3 className='
                            animate-spin
                            mt-2 text-black dark:text-white
                            ' size={26}/>
                            :
                            <input type='submit'
                            value='Signin'
                           
                            className='w-full rounded text-white dark:text-[#272727] dark:bg-[#ebdfdf]  bg-[#5a5252] hover:bg-opacity-90 dark:hover:bg-opacity-90 transition font-semibold text-lg  mt-4 cursor-pointer
                        p-1'/>
                            
}
                

                    <div className='flex justify-between mt-4'>
                        <Link className='text-gray-400 dark:hover:text-white hover:text-black transition' to='/forgot-password'>Forgot Password?</Link>
                        <Link className='text-gray-400 dark:hover:text-white hover:text-black  transition'
                            to='/signup'>Sign Up</Link>


                    </div>
                </form>
            </div>

        </div>
    );
};

export default SignIn;