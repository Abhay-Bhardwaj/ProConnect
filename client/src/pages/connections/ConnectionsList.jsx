import { apiClient } from '@/lib/api-client';
import { CREATE_INDIVIDUAL_THREAD } from '@/utils/constants';
import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function ConnectionsList({list}) {

    const navigate = useNavigate();

    const handleChat=(id)=>{
        const checkThread= async()=>{ 
          try{
              const newThread = await apiClient.post(CREATE_INDIVIDUAL_THREAD, {otherUser: id});
              console.log('newThread: ',newThread);
              navigate(`/chats/threads/${newThread.data.threadId}`);
          }catch(err){
            console.log('error: ',err);
            toast.error(err.response.data);
          }
        }
        checkThread();
      }
  return (
    <div className='p-2'>
        {list?.map((item, index)=>(

        <div key={index} className='flex items-center justify-between p-2 border-b-2'>
            <a href={`/u/${item.userName}`} title='View Profile'>
                <div className='flex items-center'>
                    <img src={item.image} alt='profile' className='w-10 h-10 rounded-full'/>
                    <div className='ml-2'>
                        <h1 className='font-bold'>{`${item.firstName} ${item.lastName}`}</h1>
                        <p>{item.headline}</p>
                    </div>
                </div>
            </a>
            <div>
                <button className='bg-input hover:bg-foreground text-white p-2 rounded-lg' onClick={()=>handleChat(item._id)}>Message</button>
            </div>
        </div>
        ))}
    </div>
  )
}
