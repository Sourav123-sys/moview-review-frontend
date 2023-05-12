import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-hot-toast';
import { faEnvelope, faEye, faEyeSlash, faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import { forgetPassword } from '../../Api/Auth';
const ForgetPassword = () => {
    const { register, reset, trigger, handleSubmit, watch, formState: { errors } } = useForm();


    const onSubmit = async (data) => {

        // console.log(data.email, 'data from signin')
        // console.log(data.password, 'data from signin')
        console.log(data, 'data from forgot pass')
        const { error, message } = await forgetPassword(data)
        if (error) {
            toast.error(error)
           }
           else {
               toast.success(message)
           }
        reset()

        //  navigate('/email-verification', { state: { user: userFindId }, replace: true })

    }


    let emailerrorMsg;

    if (errors?.email?.message) {
        emailerrorMsg = <p className='text-red-700'>Error :{errors?.email?.message}</p>;

    }



    return (
        <div className='fixed inset-0 dark:bg-slate-900 -z-10 flex justify-center items-center'>

            <div className=' max-w-screen-xl mx-auto '>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='dark:bg-[#272727] bg-white drop-shadow-lg rounded p-6 w-72 '>
                    <h1 className='text-xl text-black dark:text-white text-center'>Please enter your email</h1>

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


                    <input type='submit'
                        value='reset'
                        className='w-full rounded text-white dark:text-[#272727] dark:bg-[#ebdfdf]  bg-[#5a5252] hover:bg-opacity-90 dark:hover:bg-opacity-90 transition font-semibold text-lg  mt-4 cursor-pointer
                    p-1'/>

                    <div className='flex justify-between mt-4'>
                        <Link className='text-gray-400 dark:hover:text-white hover:text-black transition' to='/signin'>Sign In</Link>
                        <Link className='text-gray-400 dark:hover:text-white hover:text-black transition'
                            to='/signup'>Sign Up</Link>


                    </div>
                </form>

            </div>

        </div>
    );
};

export default ForgetPassword;