import { toast } from "react-hot-toast"
import client from "./Client"


export const uploadTrailer = async (formData, onUploadProgress) => {
    const token = localStorage.getItem('auth-token')

    try {

        //console.log(formData, "try passing from uploadTrailer")

        const res = await client.post('movie/uploadTrailer', formData, {
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: ({ loaded, total }) => {
                //console.log(loaded, total, 'form on upload progress');
                if (onUploadProgress) onUploadProgress(Math.floor((loaded / total) * 100))
            }
        })
        //console.log(res,'uploadTrailer')
        return res
    } catch (error) {
        //console.log(error)
    }
}


export const uploadMovie = async (formData) => {
    const token = localStorage.getItem("auth-token");
    console.log(formData, "formData from upload-movie");
    try {
        const res = await client.post("/movie/movieCreate", formData, {
            headers: {
                authorization: "Bearer " + token,
                "content-type": "multipart/form-data",
            },
        });

        console.log(res, "res from movie-upload");
        return res;

    } catch (error) {
        console.log(error, "error");
        toast.error(error.message);
    };
}



export const getMovies = async (pageNo, limit) => {
    console.log(pageNo, limit, "page No-Limit from page get movie");
    const token = localStorage.getItem("auth-token");
    try {
        const res = await client(
            `/movie/movies?pageNo=${pageNo}&limit=${limit}`,
            {
                headers: {
                    authorization: "Bearer " + token,
                    "content-type": "multipart/form-data",
                },
            }
        );
        return res;
    } catch (error) {
        //console.log(error,"error");
        toast.error(error.message);
    }
};

export const getMovieForUpdate = async (id) => {
    const token = localStorage.getItem("auth-token");
    try {
        const res = await client("/movie/for-update/" + id, {
            headers: {
                authorization: "Bearer " + token,
            },
        });
        console.log(res, "res from get-movie-update");
        return res;
    } catch (error) {
        toast.error(error.message);
    }
};

export const updateMovie = async (id, formData) => {
    const token = localStorage.getItem("auth-token");
    try {
        const res = await client.patch("/movie/movieUpdate/" + id, formData, {
            headers: {
                authorization: "Bearer " + token,
                "content-type": "multipart/form-data",
            },
        });
        console.log(res, "res from movie-update");
        return res;
    } catch (error) {
        toast.error(error.message);
    }
};
export const deleteMovie = async (id) => {
    const token = localStorage.getItem("auth-token");
    try {
      const res = await client.delete(`/movie/${id}`, {
        headers: {
          authorization: "Bearer " + token,
        },
      });
      console.log(res, "res from movie-delete");
      return res;
  }  catch (error) {
        toast.error(error.message);
    }
  };