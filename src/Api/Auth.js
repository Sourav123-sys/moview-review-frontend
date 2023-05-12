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
          const res = await client.post('user/signin', userInfo)
        console.log(res,'data from signuser')
          return res
    } catch (error) {
         console.log(error)
      }
}
export const getIsAuth=async (token) => {
   
 console.log(token,"token from signinuser")
   try {
     const res  = await client.get('user/is-auth', {
       headers: {
         Authorization: 'Bearer ' + token,
         accept:"application/json"
       }
          })
        console.log(res,'data from getAuth')
          return res
    } catch (error) {
         console.log(error)
      }
}
export const forgetPassword=async (passEmail ) => {
   
 console.log(passEmail ,"email from forgotpassword")
   try {
     console.log("enter in forgot")
    
     const email = passEmail.email
     console.log(passEmail,"passEmail")
     const { data } = await client.post('user/forgotPassword',{email})
     console.log(data,'forgetPassword')
       return data
    } catch (error) {
         console.log(error)
      }
}
export const verifyPasswordResetToken=async (token,userId) => {
   
 console.log(token,userId,"passing from verifyPasswordResetToken")
   try {
    
    console.log(token,userId,"try passing from verifyPasswordResetToken")
     const  res  = await client.post('user/verifyPassResetToken',{token,userId})
     console.log(res,'verifyPasswordResetToken')
       return res
    } catch (error) {
         console.log(error)
      }
}
export const resetPassword=async (passwordInfo) => {
   
 console.log(passwordInfo,"passing from resetPassword")
   try {
    
     console.log(passwordInfo, "try passing from resetPassword")
     const newPassWord = passwordInfo.newPassword
     const userId = passwordInfo.userId
     const token= passwordInfo.token
console.log(newPassWord,userId,token,"from resetPassword")
     const  res  = await client.post('user/reset-pass',{newPassWord,token,userId})
     console.log(res,'resetPassword')
       return res
    } catch (error) {
         console.log(error)
      }
}