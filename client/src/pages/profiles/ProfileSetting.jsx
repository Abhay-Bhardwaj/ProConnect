import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { GET_PROFILE_INFO, UPDATE_PROFILE_INFO, UPLOAD_PROFILE_IMAGE } from '@/utils/constants'; // Add UPLOAD_PROFILE_IMAGE
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import AddExperience from './components/AddExperience';
import Experience from './components/Experience';
import AddEducation from './components/AddEducation';
import { Loader2 } from 'lucide-react';
import Loading from '@/components/Loading';
import { setUserInfo } from '@/store/userSlice';
import { apiClient } from '@/lib/api-client';

export default function Profile() {
  const { user } = useSelector((state) => state.user);

  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState({});
  const [updatingLoading, setUpdatingLoading] = useState(false);

  /* For Profile Image Update */
  const fileInputRef = useRef(null);
  const [profileImage, setProfileImage] = useState(null);

  /* For Popup to add new Details */
  const [experiencePopup, setExperiencePopup] = useState(false);
  const [editExperienceIndex, setEditExperienceIndex] = useState(null);

  const [educationPopup, setEducationPopup] = useState(false);
  const [editEducationIndex, setEditEducationIndex] = useState(null);

  const [skillsInput, setSkillsInput] = useState(false);
  const [skill, setSkill] = useState('');

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await apiClient.get(`${GET_PROFILE_INFO}${user.userName}`);
        if (response.status === 200 && response.data.user) {
          setProfileData(response.data.user);
          console.log('ProfileData: ', response.data.user);
        }
      } catch (err) {
        toast.error(err.response.data);
        console.log('error: ', err);
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, [user, user.userName]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleExperienceSubmit = (experience) => {
    setProfileData((prevData) => ({
      ...prevData,
      experience: editExperienceIndex !== null
        ? prevData.experience.map((exp, index) =>
            index === editExperienceIndex ? experience : exp
          )
        : [...(prevData.experience || []), experience],
    }));
    setEditExperienceIndex(null);
    setExperiencePopup(false);
  };

  const handleEditExperience = (index) => {
    setEditExperienceIndex(index);
    setExperiencePopup(true);
  };

  const handleEducationSubmit = (education) => {
    setProfileData((prevData) => ({
      ...prevData,
      education: editEducationIndex !== null
        ? prevData.education.map((edu, index) =>
            index === editEducationIndex ? education : edu
          )
        : [...(prevData.education || []), education],
    }));
    setEditEducationIndex(null);
    setEducationPopup(false);
  };
  
  const handleEditEducation = (index) => {
    setEditEducationIndex(index);
    setEducationPopup(true);
  };

  const handleSkillSubmit = () => {
    if (!skill) return;
    setProfileData((prevData) => ({
      ...prevData,
      skills: [...(prevData.skills || []), skill],
    }));
    setSkillsInput(false);
    setSkill('');
  };

  const handleDelete = (field, index) => {
    setProfileData((prevData) => ({
      ...prevData,
      [field]: prevData[field].filter((item, i) => i !== index),
    }));
  };

  const handleSave = async () => {
    setUpdatingLoading(true);
    try {
      if (profileImage) {
        const formData = new FormData();
        formData.append('image', profileImage);

        const imageResponse = await apiClient.patch(UPLOAD_PROFILE_IMAGE, formData, {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        if (imageResponse.status === 200) {
          console.log('imageResponse.data: ', imageResponse.data); // Log the entire response data
          setProfileData((prevData) => {
            const updatedData = {
              ...prevData,
              image: imageResponse.data.imageUrl, // Assuming the response has imageUrl
            };
            return updatedData;
          });
        }
      }


      const response = await apiClient.patch(UPDATE_PROFILE_INFO, profileData, {
        withCredentials: true,
      });

      if (response.status === 200) {
        // Log the entire response data
        const updatedData = await apiClient.get(`${GET_PROFILE_INFO}${user.userName}`);
        setProfileData(updatedData.data.user);
        // dispatch(setUserInfo({ user: response.data.user }));
        toast.success('Profile Updated Successfully');
      }
    } catch (err) {
      console.log('error: ', err);
      toast.error(err.response.data);
      
    }
    setUpdatingLoading(false);
  };

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    console.log('e.target.files[0]: ', e.target.files);
    setProfileImage(e.target.files[0]);
  };

  const handleDeleteImage = async () => {
    setProfileData((prevData) => ({
      ...prevData,
      image: '',
    }));
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className='p-3'>
      <div className='flex flex-col md:flex-row gap-2'>
        <div className='w-full md:w-3/4 rounded-lg flex flex-col gap-2'>
          <div className='bg-white rounded-lg p-4 shadow-md'>
            <div className='flex flex-col '>
              <div onClick={handleFileInputClick}>
                <img src='/assets/cover-image.jpg' alt='cover' className='w-full h-40 object-cover  rounded-md' />
              </div>
              <img
                src={profileData.image ? profileData.image : '/assets/defaultUserDP.jpg'}
                alt='profile'
                className='relative -top-10 w-32 h-32 rounded-full bg-white -mb-10 cursor-pointer'
                onClick={handleFileInputClick}

              />
              <input
                type='file'
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
            </div>
            <div className='flex flex-col sm:flex-row gap-1'>
              <div className='flex flex-col w-min'>
                <label className='text-lg font-semibold'>First Name</label>
                <input
                  name='firstName'
                  value={profileData?.firstName}
                  onChange={handleChange}
                  className='border-2 border-gray-300 rounded-md p-1'
                />
              </div>
              <div className='flex flex-col w-min'>
                <label className='text-lg font-semibold'>Last Name</label>
                <input
                  name='lastName'
                  value={profileData?.lastName}
                  onChange={handleChange}
                  className='border-2 border-gray-300 rounded-md p-1'
                />
              </div>
            </div>
            <div className='flex flex-col'>
              <label className='text-lg font-semibold'>Headline</label>
              <input
                name='headline'
                value={profileData?.headline}
                onChange={handleChange}
                className='border-2 border-gray-300 rounded-md p-1'
              />
            </div>
          </div>
          <div className='bg-white rounded-lg p-4 shadow-md flex flex-col'>
            <label className='text-lg font-semibold'>About</label>
            <Textarea name='about' value={profileData?.about} onChange={handleChange} />
          </div>

          <div className='bg-white rounded-lg p-4 shadow-md flex flex-col'>
            <label className='text-lg font-semibold'>Experience</label>
            <Button className='w-min h-min bg-input' onClick={() => { setExperiencePopup(true); setEditExperienceIndex(null); }}>
              Add Experience
            </Button>

            {experiencePopup && (
              <AddExperience
                setExperiencePopup={setExperiencePopup}
                setNewExperience={handleExperienceSubmit}
                experience={editExperienceIndex !== null ? profileData.experience[editExperienceIndex] : {}}
              />
            )}
            <div className='flex flex-col gap-2 mt-4'>
              {profileData.experience && profileData.experience.map((exp, index) => (
                <div key={index} className='bg-gray-100 p-2 rounded-md relative'>
                  <div className='absolute top-2 right-2 flex gap-1'>
                    <Button className='w-min h-min bg-input' onClick={() => handleEditExperience(index)}>Edit</Button>
                    <Button className='w-min h-min bg-input' onClick={() => handleDelete('experience', index)}>Delete</Button>
                  </div>
                  
                  <Experience item={exp} />
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className='bg-white rounded-lg p-4 shadow-md flex flex-col'>
              <h1 className='text-lg font-semibold'>Education</h1>
              <Button className='w-min h-min bg-input' onClick={() => { setEducationPopup(true); setEditEducationIndex(null); }}>
                Add Education Details
              </Button>
              {educationPopup && (
                <AddEducation
                  setEducationPopup={setEducationPopup}
                  setNewEducation={handleEducationSubmit}
                  education={editEducationIndex !== null ? profileData.education[editEducationIndex] : {}}
                />
              )}
              <div className='flex flex-col gap-2 mt-4'>
                {profileData.education && profileData.education.map((exp, index) => (
                  <div key={index} className='bg-gray-100 p-2 rounded-md relative'>
                    <div className='absolute top-2 right-2 flex gap-1'>
                      <Button className='w-min h-min bg-input' onClick={() => handleEditEducation(index)}>Edit</Button>
                      <Button className='w-min h-min bg-input' onClick={() => handleDelete('education', index)}>Delete</Button>
                    </div>
                    <Experience item={exp} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <div className='bg-white rounded-lg p-4 shadow-md flex flex-col'>
              <h1 className='text-lg font-semibold'>Skills</h1>
              <Button onClick={() => setSkillsInput(true)} className='w-min h-min bg-input'>Add Skills</Button>
              {
                skillsInput && (
                  <div className='flex flex-col gap-2 mt-4'>
                    <input
                      type='text'
                      placeholder='Add Skills'
                      value={skill}
                      onChange={(e) => setSkill(e.target.value)}
                      className='border-2 border-gray-300 rounded-md p-1'
                    />
                    <Button onClick={handleSkillSubmit} className='w-min h-min bg-input'>Add</Button>
                  </div>
                )
              }
              <div className='flex flex-row gap-2 mt-4 bg-gray-100 p-2 rounded-md'>
                {profileData.skills && profileData.skills.map((skill, index) => (
                  <div key={index} className='bg-gray-100 p-2 rounded-md'>
                    <div className='relative px-3 py-1 w-min h-min bg-slate-800 text-white rounded-xl'>
                      <span onClick={() => handleDelete('skills', index)} className=' absolute top-0 right-0 w-min h-min cursor-pointer'>X</span>
                      <span>{skill}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className='sticky bottom-0 flex flex-row bg-foreground rounded-b-xl w-full justify-end '>
            <Button className='w-min h-min m-1 bg-input' disabled={updatingLoading} onClick={handleSave}>
              {updatingLoading ? <Loader2 className='animate-spin' /> : 'Update Profile'}
            </Button>
          </div>
        </div>

        <div className='w-full md:w-1/4 h-min bg-white rounded-lg shadow-md p-2 flex flex-col gap-2'>
          {/* for editing the use name of the student */}
        </div>
      </div>
    </div>
  );
}
