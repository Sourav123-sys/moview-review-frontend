import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import { toast } from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faEye, faEyeSlash, faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { ImSpinner3, ImSpinner4, ImSpinner9 } from "react-icons/im"
import { resetPassword, verifyPasswordResetToken } from '../../Api/Auth';
import { useEffect } from 'react';



const ConfirmPassword = () => {
    const { register, reset, trigger, handleSubmit, watch, formState: { errors } } = useForm();
    const [searchParams] = useSearchParams()
    const token = searchParams.get('token')
    const id = searchParams.get('id')

    console.log(token, id, 'token,id')
    
    const [show, setShow] = useState(true)

    const [confirmShow, setConfirmShow] = useState(true)


    const [isVerifying, setIsverfying] = useState(true)
    const [isValid, setIsvalid] = useState(false)

    const navigate = useNavigate()


    useEffect(() => {
        isValidToken()


    }, [])
    const isValidToken = async () => {

        const { data } = await verifyPasswordResetToken(token, id)
        console.log(data,'data from is valid token')
      
       console.log(data.valid, "valid")
        
        setIsverfying(false)

        if (data.error) {
          toast.error (data.error)
        }
       if (!data.valid) {
           setIsvalid(false)
           
           return navigate('/resetPassword', { replace: true })
       }
        setIsvalid(true)
    
    }

    if (isVerifying) {
        return <div className='fixed inset-0 dark:bg-slate-900 -z-10 flex justify-center items-center'>

            <div className=' max-w-screen-xl mx-auto flex items-center justify-between space-x-2'>
                <ImSpinner3 className='
                            animate-spin
                           text-black dark:text-white
                            ' size={26} />
                <h1 className="dark:text-white text-black text-2xl font-semibold">Please wait,we are Verifying your token</h1>
            </div>

        </div>
    }
    if (!isValid) {
        return <div className='fixed inset-0 dark:bg-slate-900 -z-10  justify-center items-center'>

            <div className=' max-w-screen-xl mx-auto flex items-center justify-between space-x-2'>

                <h1 className="dark:text-white text-black text-2xl font-semibold">Sorry!!!The token is Invalid</h1>
            </div>

        </div>
    }


    const onSubmit = async (DATA) => {

        // console.log(data.email, 'data from signin')
        // console.log(data.password, 'data from signin')
        console.log(DATA, 'data from confirm')
        const newPassword = DATA.newPassword
        const confirmPassword = DATA.confirmPassword

        if (newPassword !== confirmPassword) {
            toast.error("New and confirm password do not match.Try again")
        }
        else {
            const { data } = await resetPassword({
                newPassword: confirmPassword,
                token:token,
            userId:id,})
            console.log(data,'error message from confirm on submit')
            if (data.error) {
                toast.error (data.error)
            }
            else {
              
                toast.success(data.message)
                navigate('/signin', { replace: true })
               
            }
            reset()
        }
       
    

        //  navigate('/email-verification', { state: { user: userFindId }, replace: true })

    }


    let passworderrorMsg;

    if (errors?.newPassword?.message) {
        passworderrorMsg = <p className='text-red-700'>Error :{errors?.newPassword?.message}</p>;

    }
    let confirmPassworderrorMsg;

    if (errors?.confirmPassword?.message) {
        confirmPassworderrorMsg = <p className='text-red-700'>Error :{errors?.confirmPassword?.message}</p>;

    }

    return (
        <div className='fixed inset-0 dark:bg-slate-900 -z-10 flex justify-center items-center'>

            <div className=' max-w-screen-xl mx-auto'>

                <form

                    onSubmit={handleSubmit(onSubmit)}
                    className='dark:bg-[#272727] bg-white drop-shadow-lg rounded p-6 w-72'>
                    <h1 className='text-xl dark:text-white text-gray-900 text-center'>Confirm your Password</h1>



                    <div className='relative z-0 flex flex-col-reverse mt-4'>

                        <input

                            type={show ? 'password' : "text"} name='newPassword' id='newPassword'
                            {...register('newPassword', {
                                required: 'newpassword is required',
                                pattern: {
                                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                                    message: "Minimum six characters, at least one letter and one number"
                                }

                            })}
                            onKeyUp={() => {
                                trigger('newPassword')
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
                            className='font-semibold dark:text-[#5a5151] text-[#9d9696] dark:peer-focus:text-white peer-focus:text-[#514747] transition self-start ml-5'>New Password</label>
                    </div>
                    {passworderrorMsg}

                    <div className='relative z-0 flex flex-col-reverse mt-4'>

                        <input

                            type={confirmShow ? 'password' : "text"} name='confirmPassword' id='confirmPassword'
                            {...register('confirmPassword', {
                                required: 'confirmpassword is required',
                                pattern: {
                                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                                    message: "Minimum six characters, at least one letter and one number"
                                }

                            })}
                            onKeyUp={() => {
                                trigger('confirmPassword')
                            }}
                            className='bg-transparent rounded border-2 border-[#ae9e9e]  w-full text-lg outline-none focus:border-[#514747] p-1 dark:text-white peer  dark:focus:border-white  text-black peer transition'
                            placeholder='******'
                        />

                        {
                            confirmShow ?
                                <>
                                    <FontAwesomeIcon className='absolute top-0 right-0 mt-9 px-2' onClick={() => setConfirmShow(!confirmShow)} icon={faEyeSlash} />
                                    <FontAwesomeIcon className="absolute top-0 left-0 mt-1" icon={faLock} ></FontAwesomeIcon>
                                </>

                                :
                                <>
                                    <FontAwesomeIcon className='absolute top-0 right-0 mt-9 px-2' onClick={() => setConfirmShow(!confirmShow)} icon={faEye} />
                                    <FontAwesomeIcon className="absolute top-0 left-0 mt-1" icon={faLockOpen} ></FontAwesomeIcon>
                                </>


                        }
                        <label htmlFor='password'
                            className='font-semibold dark:text-[#5a5151] text-[#9d9696] dark:peer-focus:text-white peer-focus:text-[#514747] transition self-start ml-5'>Confirm Password</label>
                    </div>
                    {confirmPassworderrorMsg}


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