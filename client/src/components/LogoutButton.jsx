import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../store/userSlice';

const LogoutButton = ({children}) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return <div onClick={handleLogout}>{children}</div>;
};

export default LogoutButton;