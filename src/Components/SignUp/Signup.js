import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faEye, faEyeSlash, faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import { createUser } from '../../Api/Auth';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { useAuth } from '../../Hooks/Hooks';
const Signup = () => {

    const { register, reset, trigger, handleSubmit, watch, formState: { errors } } = useForm();
    console.log(errors)
    const [show, setShow] = useState(true)

    const navigate = useNavigate()

    const onSubmit = async (data) => {
        const userFindId = await createUser(data);
        console.log(userFindId, 'find id')
        console.log(userFindId, 'user-signup')
        reset()

        navigate('/email-verification', { state: { user: userFindId }, replace: true })
        toast.success('please,Verify your email.')
    }
    let nameerrorMsg;

    if (errors?.name?.message) {
        nameerrorMsg = <p className='text-red-700'>Error :{errors?.name?.message}</p>;

    }
    let emailerrorMsg;

    if (errors?.email?.message) {
        emailerrorMsg = <p className='text-red-700'>Error :{errors?.email?.message}</p>;

    }
    let passworderrorMsg;

    if (errors?.password?.message) {
        passworderrorMsg = <p className='text-red-700'>Error :{errors?.password?.message}</p>;

    }
    const { authInfo } = useAuth()
    const { isLoggedIn } = authInfo
    useEffect(() => {

        if (isLoggedIn) {
            navigate('/')
        }

    }, [isLoggedIn])
    return (
        <div className='fixed inset-0  dark:bg-slate-900 -z-10 flex justify-center items-center'>

            <div className=' max-w-screen-xl mx-auto'>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='dark:bg-[#272727] bg-white drop-shadow-lg rounded p-6 w-72'>
                    <h1 className='text-xl dark:text-white text-gray-900 text-center'>Sign Up</h1>

                    <div className='flex flex-col-reverse mt-4'>

                        <input

                            type='name' name='name' id='name'
                            {...register("name", {
                                required: 'name is Required',
                                minLength: {
                                    value: 3, message: 'Minimum 3 character required'
                                }
                            })}

                            onKeyUp={() => {
                                trigger('name')
                            }}
                            className='bg-transparent rounded border-2 border-[#ae9e9e]  w-full text-lg outline-none focus:border-[#514747] p-1 dark:text-white peer  dark:focus:border-white  text-black peer transition'
                            placeholder='example'

                        />
                        <label htmlFor='name'
                            className='font-semibold dark:text-[#5a5151] text-[#9d9696] dark:peer-focus:text-white peer-focus:text-[#514747] transition self-start'>Name</label>
                    </div>
                    {nameerrorMsg}

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
                                pattern: {
                                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                                    message: "Minimum six characters, at least one letter and one number"
                                }
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