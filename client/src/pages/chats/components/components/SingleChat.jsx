import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

export default function SingleChat({ message, chatInfo }) {
    const { user } = useSelector((state) => state.user);
    const chatRef = useRef(null);

    useEffect(() => {
        chatRef.current?.lastElementChild?.scrollIntoView();
    }, [message]);

    // Function to format the ISO timestamp
    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        // Check if the date is valid
        if (isNaN(date.getTime())) {
            return 'Invalid time'; // Handle invalid date
        }
        // Format the time as hours and minutes
        return date.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const formattedTime = formatTime(message.timeStamps);

    return (
        <div ref={chatRef} className={`flex w-full mt-1 mb-1 ${user.id === message.sender ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex items-center gap-2 p-2 border-b rounded-tl-lg rounded-br-lg text-white border-gray-200 ${user.id === message.sender ? 'bg-blue-200' : 'bg-gray-200'}`}>
                <div className='flex flex-row gap-1'>
                    {
                        user.id !== message.sender ?
                        <img src={chatInfo.otherUser.image} alt={chatInfo.otherUser.fullName} className='w-6 h-6 rounded-full' /> :
                        <img src={user.image} alt={user.fullName} className='w-6 h-6 rounded-full' />
                    }
                    <div className='flex flex-col'>
                        {
                            user.id !== message.sender ?
                            <span className='text-sm'>{chatInfo.otherUser.fullName}</span> :
                            <span className='text-sm'>{user.firstName + " " + user.lastName}</span>
                        }
                        <p className='text-sm text-black'>{message.content}</p>
                        <span className='text-[8px]  text-gray-500 text-right'>{formattedTime}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
