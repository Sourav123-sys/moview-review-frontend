import client from "./Client"


export const uploadTrailer = async (formData,onUploadProgress) => {
    const token = localStorage.getItem('auth-token')

    try {
    
        console.log(formData, "try passing from uploadTrailer")
   
        const  res  = await client.post('movie/uploadTrailer',formData,{
            headers: {
              Authorization: 'Bearer ' + token,
             'Content-Type':'multipart/form-data'
            },
            onUploadProgress: ({ loaded, total }) => {
                console.log(loaded, total, 'form on upload progress');
                if(onUploadProgress) onUploadProgress(Math.floor((loaded/total)*100))
            }
               })
        console.log(res,'uploadTrailer')
          return res
       } catch (error) {
            console.log(error)
         }
}