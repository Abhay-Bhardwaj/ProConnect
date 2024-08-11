import React, { useEffect, useState } from 'react'
import ChatList from './components/ChatList'
import OpenChat from './components/OpenChat'
import ChatOptions from './components/ChatOptions'
import { useSelector } from 'react-redux'
import { GET_THREADS } from '@/utils/constants'
import Loading from '@/components/Loading'
import { apiClient } from '@/lib/api-client'

const ChatsContainer = () => {
  const [search, setSearch] = useState('')
  const [threadList, setThreadsList]= useState([]);
  const {user}= useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    setLoading(true);
    const getThreads = async()=>{
      try{
        const response= await apiClient.get(GET_THREADS);
        if(response.status===200){
          console.log('response: ',response);
          
          setThreadsList(response.data);
        }
      }
      catch(err){
        console.log('Error Fetching Threads: ', err.message);

      }
    }
    if(user){
      getThreads();
    }
    setLoading(false);  

  },[user]);

  if(loading){
    return <Loading/>
  }
  return (
    <div className='p-4 grid place-items-center'>
      <div className='bg-white rounded-lg w-full  h-full md:w-[80vw] flex flex-col p-4'>
        <ChatOptions/>
        <hr/>
        <div className='flex flex-row h-full'>
          <ChatList threadList={threadList}/>
          <OpenChat threadList={threadList}/>
        </div>
        
      </div>
    </div>
  )
}

export default ChatsContainer