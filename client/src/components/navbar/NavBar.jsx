import { HomeIcon, MessageSquareMore, ScrollText, SquareUser, Users } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { useDispatch, useSelector } from 'react-redux';
import { removeUserInfo } from '@/store/userSlice';
import { Navigate } from 'react-router-dom';
import LogoutButton from '../LogoutButton';

export default function NavBar() {
  const dispatch = useDispatch();
  const {user}=useSelector((state) => state.user);
  return (
    <nav className='sticky flex p-5 top-0 w-full h-11 z-10 bg-white items-center justify-between'>
      <img src='/assets/logo.png' alt='logo' className='h-8'/>
      <div className='flex flex-row gap-4 justify-center'>
        <a className='grid place-items-center' href='/'>
          <div className='group cursor-pointer grid place-items-center hover:stroke-glow'>
            <HomeIcon  className='stroke-foreground group-hover:stroke-glow '/>
            <span className='text-foreground group-hover:text-glow  font-dm font-semibold text-xs hidden md:block'>Home</span>
          </div>
        </a>
        {/* <div className='cursor-pointer grid place-items-center'>
          <MessageSquareMore />
          <span className='text-foreground font-semibold text-xs hidden md:block'>Chats</span>
        </div> */}
        <div className='group cursor-pointer grid place-items-center'>
          <Users className='stroke-foreground group-hover:stroke-glow' />
          <span className='text-foreground group-hover:text-glow font-semibold text-xs hidden md:block'>Connect</span>
        </div>
        <div className='group cursor-pointer grid place-items-center'>
          <ScrollText className='stroke-foreground group-hover:stroke-glow' /> 
          <span className='text-foreground group-hover:text-glow font-semibold text-xs hidden md:block'>Jobs</span>
        </div>

        { user &&  <a title='Profile' href={`/u/${user.userName}`} >
            <div className='group cursor-pointer grid place-items-center'>
              <SquareUser  className='stroke-foreground group-hover:stroke-glow' />
              <span className='text-foreground group-hover:text-glow font-semibold text-xs hidden md:block'>Profile</span>
            </div>
          </a>
        }
        {
          user? (
            <LogoutButton/>
          ):(
            <div className='flex gap-2'>
             <a href='/auth'><Button className='h-[90%] bg-input'>Sign In</Button></a>
            </div>
          )
        }
      </div>
    </nav>
  )
}
