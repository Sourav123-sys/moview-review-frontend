import React from 'react';
import client from './Client';
import { toast } from 'react-hot-toast';

export const createActor = async (formData) => {
    console.log(formData,"formdata from actor");
    const token = localStorage.getItem("auth-token");
    try {
      const  res  = await client.post("/actor/actorCreate", formData, {
        headers: {
          authorization: "Bearer " + token,
          "content-type": "multipart/form-data",
        },
      });
      console.log(res,"res from actor create");
        return res;
        
    } catch (error) {
        console.log(error,"error");
    toast.error(error.message);
    }
    
  };