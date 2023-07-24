import React from 'react';
import client from './Client';
import { toast } from 'react-hot-toast';

export const createActor = async (formData) => {
   //console.log(formData,"formdata from actor");
    const token = localStorage.getItem("auth-token");
    try {
      const  res  = await client.post("/actor/actorCreate", formData, {
        headers: {
          authorization: "Bearer " + token,
          "content-type": "multipart/form-data",
        },
      });
     //console.log(res,"res from actor create");
        return res;
        
    } catch (error) {
       //console.log(error,"error");
    toast.error(error.message);
    }
    
};
  
export const searchActor = async (query) => {
   console.log(query,"query from search actor");
    const token = localStorage.getItem("auth-token");
    try {
      const res= await client(`/actor/search?name=${query}`, {
        headers: {
          authorization: "Bearer " + token,
        },
      });
     console.log(res,"res from search actor ");
      return res;
    } catch (error) {
       //console.log(error,"error");
        toast.error(error.message);
    }
  };


  export const getActors = async (pageNo, limit) => {
    const token = localStorage.getItem("auth-token");
    console.log(pageNo,limit,"page No-Limit from page get actors");
    try {
      const  res  = await client(
        `/actor/actors?pageNo=${pageNo}&limit=${limit}`,
        {
          headers: {
            authorization: "Bearer " + token,
            "content-type": "multipart/form-data",
          },
        }
      );
      console.log(res,"res from get actors");
      return res;
    }catch (error) {
      //console.log(error,"error");
       toast.error(error.message);
   }
};
  
export const updateActor = async (id, formData) => {
  const token = localStorage.getItem("auth-token");
  console.log(id,formData,"from update-actor")

  try {
    const  res  = await client.post("/actor/updateActor/" + id, formData, {
      headers: {
        authorization: "Bearer " + token,
        "content-type": "multipart/form-data",
      },
    });
    console.log(res,"res from update=actor");
    return res;
  }catch (error) {
    //console.log(error,"error");
     toast.error(error.message);
 }
};
