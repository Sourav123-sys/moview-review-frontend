import React, { useEffect } from 'react';
import { useAuth } from '../../Hooks/Hooks';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const { authInfo } = useAuth()
    console.log(authInfo, 'authInfo from home page')
    const { isLoggedIn } = authInfo
    const  isVerified  = authInfo?.profile?.isVerified
    const navigate = useNavigate()


   
    const navigateVerfication = () => {
        console.log('am from verification page')
    navigate('/email-verification',{state:{user:authInfo.profile}})
}
    return (



        <div className='fixed inset-0 dark:bg-slate-900 -z-10  '>
            {
                isLoggedIn && !isVerified ?
                    <div className=' flex items-center justify-center mt-16'> <p className='text-lg dark:text-white text-center dark:bg-gray-700 p-2'>You haven't verify your account</p>

                        <button
                            onClick ={navigateVerfication}
                            className='text-blue-500 font-semibold hover:underline'>Click Here to your Verify your account</button></div>
                    : 

                    <div className='mt-16'>

                        <h1 className=' text-center dark:text-white'>Welcome to movie review app</h1>
                    </div>

            }

        </div>


    );
};

export default Home;