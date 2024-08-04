import { HomeIcon, MessageSquareText, ScrollText, SquareUser, Users } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import {useSelector } from 'react-redux';
import LogoutButton from '../LogoutButton';
import MenuDropDown from './MenuDropDown';

export default function NavBar() {
  const {user}=useSelector((state) => state.user);
  return (
    <nav className='sticky flex p-5 top-0 w-full h-12 z-10 bg-white items-center justify-between'>
      <a title='Home' href='/' className='hover:cursor-pointer'><img src='/assets/logo.png' alt='logo' className='h-4 sm:h-8'/></a>
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

        { user &&  <a className='group cursor-pointer grid place-items-center' title='Messages' href={`/chats/threads/`} >
            <div className='group cursor-pointer grid place-items-center'>
              <MessageSquareText  className='stroke-foreground group-hover:stroke-glow' />
              <span className='text-foreground group-hover:text-glow font-semibold text-xs hidden md:block'>Messages</span>
            </div>
          </a>
        }

        {/* { user &&  <a className='group cursor-pointer grid place-items-center' title='Profile' href={`/u/${user.userName}`} >
            <div className='group cursor-pointer grid place-items-center'>
              <SquareUser  className='stroke-foreground group-hover:stroke-glow' />
              <span className='text-foreground group-hover:text-glow font-semibold text-xs hidden md:block'>Profile</span>
              <MenuDropDown/>
            </div>
          </a>
        } */}
        {
          user? (
            <MenuDropDown/>
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
