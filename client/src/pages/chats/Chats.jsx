import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const Chats = () => {
  const user= useSelector((state) => state.user);
  const navigate=useNavigate();

  useEffect(() => {
    
  },[])
  return (
    <div>Messages</div>
  )
}

export default Chats