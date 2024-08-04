import { CircleX} from 'lucide-react';
import React, { useEffect, useState } from 'react';

export default function AddExperience({ setNewExperience, setExperiencePopup, experience  }) {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    from: '',
    to: '',
    current: false,
  });
  useEffect(() => {
    if (experience) {
      setFormData(experience);
    }
  }, [experience]);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setNewExperience(formData);
    setExperiencePopup(false);
  };

  return (
    <div className='w-screen h-screen fixed top-0 left-0 z-20 overflow-auto bg-black bg-opacity-50 p-4'>
      <div className=' relative bg-white p-4 rounded-lg'>
        <h1 className='text-2xl font-dm font-semibold'>Add Experience</h1>
        <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-2'>
            <label htmlFor='title'>Title/Position</label>
            <input
              type='text'
              name='title'
              id='title'
              value={formData.title}
              onChange={handleChange}
              className='border border-input p-2'
              required
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor='company'>Company</label>
            <input
              type='text'
              name='company'
              id='company'
              value={formData.company}
              onChange={handleChange}
              className='border border-input p-2'
              required
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor='location'>Location</label>
            <input
              type='text'
              name='location'
              id='location'
              value={formData.location}
              onChange={handleChange}
              className='border border-input p-2'
            />
          </div>
          <div className='flex flex-col sm:flex-row gap-2'>
            <div className='flex flex-col gap-2'>
                <label htmlFor='from'>From</label>
                <input
                type='date'
                name='from'
                id='from'
                value={formData.from}
                onChange={handleChange}
                className='border border-input p-2'
                required
                />
            </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor='to'>To</label>
                    <input
                    type='date'
                    name='to'
                    id='to'
                    value={formData.to}
                    onChange={handleChange}
                    className='border border-input p-2'
                    disabled={formData.current}
                    />
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor='current'>Current</label>
                    <input
                    type='checkbox'
                    name='current'
                    id='current'
                    checked={formData.current}
                    onChange={handleChange}
                    className='border border-input p-2'
                    />
                </div>
            </div>
            <button type='submit' className='bg-input p-2 text-white'>
                {experience ? 'Edit Experience' : 'Add Experience'}
            </button>
        </form>
        <CircleX className='absolute top-4 right-4 cursor-pointer'  onClick={()=>setExperiencePopup(false)}/>
      </div>
    </div>
  );
}
