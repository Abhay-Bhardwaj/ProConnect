import { CREATE_INDIVIDUAL_THREAD, FOLLOW_USER, GET_PROFILE_INFO, GET_THREADS, UNFOLLOW_USER } from '@/utils/constants';
import React, { useEffect, useState } from 'react'
import {useNavigate, useParams} from "react-router-dom";
import { toast } from 'sonner';
import Experience from './components/Experience';
import { UserRoundPen } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '@/components/Loading';
import { Button } from '@/components/ui/button';
import { apiClient } from '@/lib/api-client';

export default function userProfile() {
  const {userName}=useParams();
  const [userInfo,setuserInfo]=useState(null);
  const [loading,setLoading]=useState(true);
  const [sameUser,setSameUser]=useState(false);
  const {user}=useSelector(state=>state.user) || null;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{

    const getuserInfo= async()=>{
      try{
        const response = await apiClient.get(`${GET_PROFILE_INFO}${userName}`);
        if(user && user.id===response.data.user._id){
          setSameUser(true);
        }
        setuserInfo(response.data.user);
        console.log(response.data.user);
        console.log('user: ',user);
      }catch(err){
        toast.error(err.response.data);
        console.log('error: ',err);
      }finally{
        setLoading(false);
      }
    }
    getuserInfo();
  },[userName])

  const handleMessageClick=()=>{
    const checkThread= async()=>{ 
      try{
          const newThread = await apiClient.post(CREATE_INDIVIDUAL_THREAD, {otherUser: userInfo._id});
          console.log('newThread: ',newThread);
          navigate(`/chats/threads/${newThread.data.threadId}`);
      }catch(err){
        console.log('error: ',err);
        toast.error(err.response.data);
        
      }
    }
    checkThread();
  }


  const handleFollowChange=async()=>{
    if(userInfo.followers.includes(user.id)){
      try{
        const response = await apiClient.patch(`${UNFOLLOW_USER}/${userInfo._id}`);
        console.log('response: ',response.data);
        toast.success(response.data);
        setuserInfo((prevInfo) => ({
          ...prevInfo,
          followers: prevInfo.followers.filter((id) => id !== user.id),
        }));
      }catch(err){
        toast.error(err.response.data);
        console.log('error: ',err);
      }
    }
    else{
      try{
        const response = await apiClient.patch(`${FOLLOW_USER}/${userInfo._id}`);
        console.log('response: ',response.data);
        setuserInfo((prevInfo) => ({
          ...prevInfo,
          followers: [...prevInfo.followers, user.id],
        }));
        toast.success(response.data);
      }catch(err){
        toast.error(err.response.data);
        console.log('error: ',err);
      }
    }
  }
  if(loading){
    return <Loading/>
  }

  return (
    <div className='h-screen w-full p-2'>
      {userInfo?(
        <div className='flex flex-col md:flex-row gap-2'>
          <div className='relative w-full md:w-3/4 rounded-md p-2 flex flex-col gap-2'>
            {sameUser && <a title='Edit Profile' href='/profile-setting' className='absolute top-3 right-3 flex p-1 rounded-md gap-1 text-white bg-input'>Edit <UserRoundPen /></a>}
            <div className='bg-white rounded-lg p-4 shadow-md'>
              <div className='flex flex-col '>
                <div>
                  <img src='/assets/cover-image.jpg' alt="cover" className='w-full h-40 object-cover rounded-md' />
                </div>
                <img src={userInfo.image ? userInfo.image : '/assets/defaultUserDP.jpg'} alt="profile" className='relative -top-10 w-32 h-32 rounded-full -mb-10' />
              </div>
              <div>
                <h1 className='text-2xl font-semibold'>{userInfo.firstName} {userInfo.lastName}</h1>
                <p className='text-lg'>{userInfo.headline}</p>  
              </div>
              {
                user && !sameUser &&(
                  <div className='flex gap-2'>
                    <Button title='follow' onClick={()=>handleFollowChange()}  className='bg-input h-8'>
                      {
                        userInfo.followers.includes(user.id) ? 'Unfollow' : 'Follow'
                      }
                    </Button>
                    <Button onClick={()=>handleMessageClick()} title='Message' className='bg-input h-8'>Message</Button>
                  </div>
                )
              }

            </div>
            <div className='bg-white rounded-lg p-4 shadow-md'>
              <h1 className='text-xl font-bold underline'>About</h1>
              <p>{userInfo.about}</p>
            </div>
            {
              userInfo.experience.length>0 && (
                <div className='bg-white rounded-lg p-4 shadow-md'>
                  <h1 className='text-xl font-bold underline'>Experience</h1>
                  {
                    userInfo.experience.map((exp,index)=>(
                      <Experience key={index} item={exp} />
                    ))
                  }
                </div>
              )
            }
            {
              userInfo.education.length>0 && (
                <div className='bg-white rounded-lg p-4 shadow-md'>
                  <h1 className='text-xl font-bold underline'>Education</h1>
                  {
                    userInfo.education.map((edu, index)=>(
                      <Experience key={index} item={edu} />
                    ))
                  }
                </div>
              )
            }
            {
              userInfo.skills.length>0 && (
                <div className='bg-white rounded-lg p-4 shadow-md'>
                  <h1 className='text-xl font-bold underline'>Skills</h1>

                    <div className='flex flex-row flex-wrap gap-2'>
                      {
                        
                        userInfo.skills.map((skill, index)=>(
                          <div key={index} className='px-2 py-1 bg-gray-500 h-min w-min rounded-md text-white p'>
                            {skill}
                          </div>
                        ))
                      }
                    </div>
                      
                </div>
              )
            }

          </div>
          <div className='w-full md:w-1/4 p-2'>
            <div className='bg-gray-200 rounded-md p-2'>
              userInfo Suggestion
            </div>
          </div>
        </div>
        ):
        <div className='flex flex-col md:flex-row gap-2'>
          <div className='w-full bg-white rounded-md p-2'>
            <h1 className='text-3xl font-bold text-center'>userInfo Does Not Exist</h1>
          </div>
        </div>
      }
    </div>
  )
}
