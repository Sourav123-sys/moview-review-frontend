import React from 'react';
import ModalContainer from './ModalContainer';
import { AiOutlineClose } from 'react-icons/ai';

const WritersModal = ({ profiles = [], visible, onClose,onRemoveClick, }) => {
    return (
        <ModalContainer   ignoreContainer onClose={onClose}  visible={visible}>
            <div className="space-y-2 bg-slate-100">
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
            </div>
      
      </ModalContainer>
    );
};

export default WritersModal;