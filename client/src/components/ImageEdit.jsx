import React, { useState } from 'react';

export default function ImageEdit({ image, defaultImage}) {
  const [currentImage, setCurrentImage] = useState(image || 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png');

  const handleRemoveImage = async () => {
    try {
      setCurrentImage(defaultImage);
    } catch (error) {
      console.error('Error removing image:', error);
      alert('Failed to remove image.');
    }
  };

  const handleChangeImage = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        setCurrentImage(URL.createObjectURL(file));
        const formData = new FormData();
        formData.append('file', file);
        setCurrentImage(response.data.secure_url);
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Failed to upload image.');
      }
    }
  };

  return (
    <div className='relative z-10'>
      <div className='flex flex-col items-center space-y-4'>
        <img 
          src={currentImage} 
          alt="Selected" 
          className='w-32 h-32 object-cover rounded-md border border-gray-300' 
        />
        <div className='flex space-x-4'>
          <button 
            onClick={handleRemoveImage} 
            className='px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400'
          >
            Remove Image
          </button>
          <label 
            htmlFor='change-image' 
            className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400'
          >
            Change Image
            <input 
              type='file' 
              id='change-image' 
              className='hidden' 
              onChange={handleChangeImage} 
            />
          </label>
        </div>
      </div>
    </div>
  );
}
