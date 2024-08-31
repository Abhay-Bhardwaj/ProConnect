import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { apiClient } from '@/lib/api-client';
import { GET_MESSAGES } from '@/utils/constants';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import SingleChat from './components/SingleChat';
import { useDispatch, useSelector } from 'react-redux';
import { useSocket } from '@/context/SocketContext';
import { selectThread, setMessages } from '@/store/chatSlice';
import { useParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

export default function OpenChat({ threadList }) {
  const { id } = useParams();
  const { chat, selectedThread } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);
  const socket = useSocket();
  const dispatch = useDispatch();
  const [inputMessage, setInputMessage] = useState('');

  const [chatInfo, setChatInfo] = useState();
  const [loading, setLoading] = useState(false);
  const [sentLoading, setSentLoading] = useState(false);

  useEffect(() => {
    if (id) {
      console.log('Dispatching selectThread with id:', id);
      dispatch(selectThread(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (selectedThread) {
      setLoading(true);
      const fetchMessages = async () => {
        try {
          const getChatInfo = threadList.find((thread) => thread.id === selectedThread);
          console.log('chat info:', getChatInfo);
          setChatInfo(getChatInfo);
          if (!getChatInfo) {
            setLoading(false);
            return;
          }
          const res = await apiClient.get(`${GET_MESSAGES}/${selectedThread}`);
          console.log('messages: ', res);
          dispatch(setMessages(res.data));
          setLoading(false);
        } catch (error) {
          console.log('Error Fetching Messages: ', error.message);
          toast.error('Error Fetching Messages');
          setLoading(false);
        }
      };
      fetchMessages();
    }
  }, [selectedThread, threadList, dispatch, id]);

  useEffect(() => {
    console.log('selectedThread updated:', selectedThread);
  }, [selectedThread]);

  if (selectedThread === null) {
    return <div>No Chat is Selected</div>;
  }
  if (loading) {
    return <div>Loading...</div>;
  }

  const handleSendMessage = async () => {
    setSentLoading(true);
    try {

      if (!inputMessage) {
        toast.error('Message is required');
        return;
      }
      socket.emit('sendMessage', {
        threadId: chatInfo.id,
        sender: user.id,
        message: inputMessage,
        messageType: 'text',
      });
      setInputMessage('');
    } catch (err) {
      console.log('Error Sending Message: ', err.message);
      toast.error('Error Sending Message');
    }
    setSentLoading(false);
  };

  const renderChat = () => {
    let lastDate=null;
    return chat.map((message, index) => {
      const showDate = !lastDate || (new Date(lastDate).toDateString() !== new Date(message.timeStamps).toDateString());
      lastDate = message.timeStamps;
      return (
        <div key={index}>
          {showDate && (
            <div className='text-center text-xs text-gray-500'>
              {new Date(message.timeStamps).toDateString()}
            </div>
          )}
          <SingleChat message={message} chatInfo={chatInfo} />
        </div>
      );
    });
  }

  return (
    <div className='w-2/3 h-full'>
      <div className='flex flex-col justify-between h-full p-1'>
        <div className='h-10 p-1 bg-background shadow-sm rounded-b-md'>
          {chatInfo && (
            <div className='flex align-middle items-center gap-1'>
              <img src={chatInfo.otherUser.image} alt='avatar' className='h-8 w-8 rounded-full' />
              <p> {chatInfo.otherUser.fullName} </p>
            </div>
          )}
        </div>
        <div className='overflow-y-scroll h-72 m-2'>
          {renderChat()}
        </div>
        <div className='flex flex-row gap-1'>
          <Input value={inputMessage} onChange={(e) => { setInputMessage(e.target.value); }} />
          <Button onClick={handleSendMessage}>{sentLoading? <Loader2 className='animate-spin'/>:'Send'}</Button>
        </div>
      </div>
    </div>
  );
}
