import axios from "axios"
import client from "./Client"

export const createUser =async (userInfo) => {
   
console.log(userInfo,"userInfo")
     try {
         const { data } = await client.post('user/create', userInfo)
         console.log(data.user,'data from auth')
         return data.user
     } catch (error) {
         console.log(error)
     }
}
export const verifyUserEmail=async (userInfo) => {
   
console.log(userInfo,"userInfo")
     try {
         const { data } = await client.post('user/verifyEmail', userInfo)
         console.log(data,'data from verifyemail')
         return data
      } catch (error) {
          console.log(error)
     }
}
export const signInUser=async (userInfo) => {
   
 console.log(userInfo,"userInfo from signinuser")
   try {
          const { data } = await client.post('user/signin', userInfo)
        console.log(data,'data from signuser')
          return data
    } catch (error) {
         console.log(error)
      }
}
export const getIsAuth=async (token) => {
   
 console.log(token,"token from signinuser")
   try {
     const { data } = await client.get('user/is-auth', {
       headers: {
         Authorization: 'Bearer ' + token,
         accept:"application/json"
       }
          })
        console.log(data,'data from getAuth')
          return data
    } catch (error) {
         console.log(error)
      }
}