import React from 'react';
import ModalContainer from './ModalContainer';
import { AiOutlineClose } from 'react-icons/ai';

const WritersModal = ({ profiles = [], visible, onClose, onRemoveClick, }) => {
   //console.log(profiles,"profiles from writersmodal")
    return (
       
        <ModalContainer   ignoreContainer onClose={onClose}  visible={visible}>
            <div className="space-y-2 bg-slate-100">
                {
                    profiles.length ?
                        <>
                                 {profiles.map(({ id, name, avatar }) => {
          return (
              <div key={id}  className='flex space-x-3 '>
              <img  className='w-16 h-16 rounded object-contain' src={avatar} alt={name} />
                  <p className='w-full  font-semibold  text-primary '>{name}</p>
                  <button
                      onClick={() => onRemoveClick(id)}
                  type='button'
                  className=' text-primary hover:opacity-80 transition p-2'
                  >
                      <AiOutlineClose/>
                  </button>
            </div>
          );
        })}
                        </>
                        :
                        <h1 className='text-red-700 p-5'>You don't have any writer list</h1>
       }
            </div>
      
      </ModalContainer>
    );
};

export default WritersModal;