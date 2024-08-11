import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { apiClient } from '@/lib/api-client';
import { GET_MESSAGES, NEW_MESSAGE } from '@/utils/constants';
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import SingleChat from './components/SingleChat';

export default function OpenChat({threadList}) {
  const {id}= useParams();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState(''); 
  const [chatInfo, setChatInfo] = useState();
  const listRef = useRef(null);


  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const getchatInfo= threadList.find((thread)=>thread.id===id);
        console.log('chat info:', getchatInfo);
        setChatInfo(getchatInfo);
        if(!getchatInfo){
          return;
        }
        const res = await apiClient.get(`${GET_MESSAGES}/${id}`);
        console.log('messages: ',res);
        setMessages(res.data);
      } catch (error) {
        console.log('Error Fetching Messages: ', error.message);
      }
    };
    fetchMessages();
  },[id, threadList]);



  if(!chatInfo){
    return <div>Chat Not Found</div>
  }

  const handleSendMessage = async () => {
    try {
      const res = await apiClient.post(NEW_MESSAGE, {
        threadId: chatInfo.id,
        message: inputMessage,
        messageType: 'text',
      });

      if(res.status===200){
        setMessages([...messages, res.data]);
        setInputMessage('');
      }

    }catch(err){
      console.log('Error Sending Message: ', err.message);
      toast.error('Error Sending Message');
    }
  }
  return (
    <div className='w-2/3 h-full'>
      <div className='flex flex-col justify-between h-full p-1' >
        <div className='h-10 p-1 bg-background shadow-sm rounded-b-md'>
          {
            chatInfo && 
            <div className='flex align-middle items-center'>
              <img src={chatInfo.otherUser.image} alt="avatar" className='h-8 rounded-full'/>
                <p> {chatInfo.otherUser.fullName} </p>
            </div>
          }
        </div>
        <div className='overflow-y-scroll h-72 m-2'>
          {messages && messages.map((message, index) => (
            <SingleChat key={index}  message={message} chatInfo={chatInfo} />
          ))}
        </div>
        <div className='flex flex-row gap-1'>
          <Input value={inputMessage} onChange={(e)=>{setInputMessage(e.target.value)}}/>
          <Button onClick={()=>{handleSendMessage()}} >Send</Button>
        </div>
      </div>
    </div>
  )
}
