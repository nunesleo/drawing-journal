import React, { useState } from 'react';

//Importing icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

// Each drawing card takes the following information when called
// at History.tsx
interface DrawingCardProps {
  url: string;
  title: string;
  index: number;
  description: string;
  emotion: number;
}

const DrawingCard: React.FC<DrawingCardProps> = ({ url, title, description, index, emotion }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (isModalOpen) {
    return (
      <div className={`fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center ${isModalOpen ? 'block' : 'hidden'}`}>
        <div className="bg-white p-8 rounded-lg shadow-lg w-2/5">
          <div className='w-full flex flex-row space-x-2'>
            <h2 className="text-lg font-semibold">{title}</h2>
            <div className='px-2 flex items-center border-purple-600 border-2 rounded-md '>
              <p className='text-purple-600 text-xs'>
                {emotion == 0 ? 'Angry' :
                  emotion == 1 ? 'Sad' :
                    emotion == 2 ? 'Happy' :
                      emotion == 3 ? 'Curious' :
                        emotion == 4 ? 'Sick' :
                          'Love'}
              </p>
            </div>
            <div className='flex flex-grow'></div>
            <button onClick={closeModal} className="px-2 bg-red-500 text-white rounded-lg text-xs">
              <FontAwesomeIcon icon={faClose}></FontAwesomeIcon>
            </button>
          </div>

          <img src={url} className='rounded-md' />
          <p className="text-gray-700 mb-4">
            {description}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div onClick={showModal} className='p-6 w-1/8 h-1/8 shadow-md bg-white rounded-md hover:-translate-y-2 transition-transform duration-200 m-2'>
      <img src={url} alt={`Drawing ${index + 1}`} className='rounded-md' />
    </div>
  );
};

export default DrawingCard;