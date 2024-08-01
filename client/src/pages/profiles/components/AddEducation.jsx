import { CircleX} from 'lucide-react';
import React, { useEffect, useState } from 'react';

export default function AddEducation({ setNewEducation, setEducationPopup, education  }) {
  const [formData, setFormData] = useState({
    title: '',
    degree: '',
    field: '',
    location: '',
    from: '',
    to: '',
    current: false,
  });
  useEffect(() => {
    if (education) {
      setFormData(education);
    }
  }, [education]);


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
    setNewEducation(formData);
    setEducationPopup(false);
  };

  return (
    <div className='w-screen h-screen fixed top-0 left-0 z-20 overflow-auto bg-black bg-opacity-50 p-4'>
      <div className=' relative bg-white p-4 rounded-lg'>
        <h1 className='text-2xl font-dm font-semibold'>Add Eduaction Detailes</h1>
        <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-2'>
            <label htmlFor='title'>Institute/School Name</label>
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
            <label htmlFor='company'>Degree</label>
            <input
              type='text'
              name='degree'
              id='degree'
              value={formData.degree}
              onChange={handleChange}
              className='border border-input p-2'
              required
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor='company'>Field of Study</label>
            <input
              type='text'
              name='field'
              id='field'
              value={formData.field}
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
          <div className='flex flex-row gap-2'>
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
                {education ? 'Edit Education Detail' : 'Add Education Detail'}
            </button>
        </form>
        <CircleX className='absolute top-4 right-4 cursor-pointer'  onClick={()=>setEducationPopup(false)}/>
      </div>
    </div>
  );
}
