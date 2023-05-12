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

        const { data } = await signInUser({ email, password })
        console.log(data, 'from handlelogin')
        const user = data.user
        const error = data.error
        console.log(user, 'user from hadnle-login-authprovider')
        console.log(error, 'error from hadnle-login-authprovider')

        if (error) {
            toast.error(error)
            return setAuthInfo({ ...authInfo, isLoggeIn: false, isPending: false, error })
        }

        setAuthInfo({
            profile: { ...user }, isPending: false, isLoggeIn: true, error: ''
        });

        localStorage.setItem('auth-token', user.token)
      
      if (user) {
          navigate('/')
        toast.success('login successfull.')
       
      }

     
    }


    const isAuth = async () => {

        const token =
            localStorage.getItem('auth-token')
        if (!token) return

        setAuthInfo({ ...authInfo, isPending: true })
        const { data } = await getIsAuth(token)
        const user = data.user
        const error = data.error
        console.log(error,'error for isAuth')
        console.log(user,'user for isAuth')
        if (error) {
            toast.error(error)
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