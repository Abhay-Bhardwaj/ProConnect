import { selectThread } from '@/store/chatSlice';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function ChatList({threadList, search}) {
  const dispatch = useDispatch();
  const navigate= useNavigate();
  const [filteredThreadList, setFilteredThreadList]= useState([]);
  console.log('threadList: ',threadList);
  const handleChatClick=(threadId)=>{
    dispatch(selectThread(threadId));
    navigate(`/chats/threads/${threadId}`);
  }

  useEffect(()=>{
    if(search){
      const NewthreadList= threadList.filter(thread=>thread.otherUser.fullName.toLowerCase().includes(search.toLowerCase()));
      setFilteredThreadList(NewthreadList);
    }
    else{
      setFilteredThreadList(threadList);
    }
  }, [search, threadList])

  return (
    <div className='w-1/3'>
      <div className='flex flex-col gap-2'>
        {
          filteredThreadList.map((thread)=>(
            <div key={thread.id} onClick={()=>{handleChatClick(thread.id)}} className='flex items-center gap-2 p-2 border-b border-gray-200 hover:cursor-pointer hover:bg-slate-200 transition-all duration-300'>
              <div className='w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center'>
                <img src={thread.otherUser.image} alt={thread.name} className='w-10 h-10 rounded-full'/>
              </div>
              <div className='flex-1'>
                <h3 className='font-semibold'>{thread.otherUser.fullName}</h3>
                <p className='text-sm text-gray-500'>{thread.otherUser.lastMessage}</p>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}
