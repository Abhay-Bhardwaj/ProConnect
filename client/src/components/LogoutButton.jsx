import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../store/userSlice';
import { Button } from './ui/button';

const LogoutButton = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return <Button className='h-[90%] bg-input' onClick={handleLogout}>Logout</Button>;
};

export default LogoutButton;