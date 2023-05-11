import React, { createContext } from 'react';
import { useState } from 'react';
import { getIsAuth, signInUser } from '../Api/Auth';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';



export const AuthContext = createContext()

const defaultAuthInfo = {
    profile: null,
    isLoggeIn: false,
    isPending: false,
    error: ''
}

const AuthProvider = ({ children }) => {

    const [authInfo, setAuthInfo] = useState({ ...defaultAuthInfo })

    const navigate = useNavigate()
    const handleLogin = async (email, password) => {

        console.log(email, password, 'from handlelogin')

        setAuthInfo({ ...authInfo, isPending: true })

        const { error, user } = await signInUser({ email, password })
        console.log(user, 'user from hadnle-login-authprovider')

        if (error) {
            return setAuthInfo({ ...authInfo, isLoggeIn: false, isPending: false, error })
        }

        setAuthInfo({
            profile: { ...user }, isPending: false, isLoggeIn: true, error: ''
        });

        localStorage.setItem('auth-token', user.token)
        if (error) {
            toast.error(error.message)
        } else {
            // navigate('/')
            // toast.success('login succesfully.')
            console.log('login succesfully.')

        }
    }


    const isAuth = async () => {

        const token =
            localStorage.getItem('auth-token')
        if (!token) return

        setAuthInfo({ ...authInfo, isPending: true })
        const { error, user } = await getIsAuth(token)
        console.log(error,'error for isAuth')
        console.log(user,'user for isAuth')
        if (error) {
            return setAuthInfo({ ...authInfo, isLoggeIn: false, isPending: false, error })
        }
        setAuthInfo({
            profile: { ...user }, isPending: false, isLoggeIn: true, error: ''
        });
    }

    const handleLogout = () => {
        localStorage.removeItem('auth-token')
        setAuthInfo({...defaultAuthInfo });
    }
    useEffect(() => {
      
    isAuth()
      
    }, [])
    


    return (
        <AuthContext.Provider value={{ authInfo, handleLogin,isAuth,handleLogout }} >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;