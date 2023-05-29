import React from 'react';
import { useState } from 'react';
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { getActors } from '../../Api/Actor';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import ActorLoading from '../Spinner/ActorLoading';
import NextAndPrevButton from './NextAndPrevButton';



let currentPageNo = 0;
const limit = 10;
const Actor = () => {

    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {

        setTimeout(() => {
            setIsLoading(false)
        }, 3000);

    }, []);
    const [actors, setActors] = useState([]);
    const [reachedToEnd, setReachedToEnd] = useState(false);
    const fetchActors = async (pageNo) => {
        const res = await getActors(pageNo, limit);
        console.log(res, "res from fetchActors");
        const { error, profiles } = res.data
        if (error) {
            toast.error(error)
        }
        if (!profiles.length) {
            currentPageNo = pageNo - 1;
            return setReachedToEnd(true);
        }
        setActors([...profiles]);
    };

    useEffect(() => {
        fetchActors();
    }, []);
    const [showOptions, setShowOptions] = useState(false);

    const handleOnMouseEnter = () => {
        setShowOptions(true);
    };

    const handleOnMouseLeave = () => {
        setShowOptions(false);
    };

    const handleOnNextClick = () => {
        if (reachedToEnd) return;
        currentPageNo += 1;
        fetchActors(currentPageNo);
    };

    const handleOnPrevClick = () => {
        if (currentPageNo <= 0) return;

        currentPageNo -= 1;
        fetchActors(currentPageNo);
    };

    useEffect(() => {
        fetchActors(currentPageNo);
    }, []);


    return (

        <>
            {
                isLoading === true ? <ActorLoading /> :
                    <div className="p-5 sm:overflow-x-hidden">
                        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-5 p-5">
                            {actors.map((actor) => (
                                <ActorProfile profile={actor} key={actor.id} />
                            ))}
                        </div>
                        <NextAndPrevButton
                            className="mt-5"
                            onNextClick={handleOnNextClick}
                            onPrevClick={handleOnPrevClick}
                        />

                    </div>
            }

        </>

    );
};

export default Actor;


const ActorProfile = ({ profile }) => {
    const [showOptions, setShowOptions] = useState(false);

    const handleOnMouseEnter = () => {
        setShowOptions(true);
    };

    const handleOnMouseLeave = () => {
        setShowOptions(false);
    };

    const { name, about = "", avatar } = profile;

    if (!profile) return null;

    return (
        <div className="bg-white shadow dark:shadow dark:bg-secondary rounded h-20 overflow-hidden">
            <div
                onMouseEnter={handleOnMouseEnter}
                onMouseLeave={handleOnMouseLeave}
                className="flex cursor-pointer relative"
                title={about}
            >
                <img
                    src={avatar}
                    alt={name}
                    className="w-20 aspect-square object-cover"
                />

                <div className="px-2">
                    <h1 title={name} className="text-xl text-primary dark:text-white font-semibold whitespace-nowrap">
                        {name}
                    </h1>
                    <p  className="text-primary dark:text-white" >
                        {about.slice(0, 20)}...
                    </p>
                </div>
                <Options visible={showOptions} />
            </div>
        </div>
    );
};


const Options = ({ visible, onDeleteClick, onEditClick }) => {
    if (!visible) return null;

    return (
        <div className="absolute inset-0 bg-primary bg-opacity-25 backdrop-blur-sm flex justify-center items-center space-x-5">
            <button
                onClick={onDeleteClick}
                className="p-2 rounded-full bg-white text-primary hover:opacity-80 transition"
                type="button"
            >
                <BsTrash />
            </button>
            <button
                onClick={onEditClick}
                className="p-2 rounded-full bg-white text-primary hover:opacity-80 transition"
                type="button"
            >
                <BsPencilSquare />
            </button>
        </div>
    );
};
