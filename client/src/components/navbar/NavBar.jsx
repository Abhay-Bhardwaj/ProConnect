import {HomeIcon, MessageSquareText, ScrollText, Search, Users } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import {useDispatch, useSelector } from 'react-redux';
import MenuDropDown from './MenuDropDown';
import { setSearchTerm } from '@/store/searchSlice';
import { Input } from '../ui/input';
import { useLocation, useNavigate } from 'react-router-dom';

export default function NavBar() {
  const {user}=useSelector((state) => state.user);
  const [search, setSearch] = useState('');
  const dispatch = useDispatch(); 
 



  
  const handleSearch = () => {
    dispatch(setSearchTerm(search))
  }
  return (
    <nav className='sticky flex p-5 top-0 w-full h-12 z-10 bg-white items-center justify-between'>
      <a title='Home' href='/' className='hover:cursor-pointer'><img src='/assets/logo.png' alt='logo' className='h-6 sm:h-8'/></a>
      
      {/* search bar */}
      <div className='flex flex-row gap-4 justify-center'>
        <div className='relative flex items-center justify-center'>
          <Input
            type='text'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Search'
            className='border p-2 pr-8 rounded-lg w-40 sm:w-60'
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button onClick={()=>handleSearch()} className='absolute right-2 top-1/2 transform -translate-y-1/2' ><Search /></button>
          
        </div>
          
        <a className='grid place-items-center' href='/'>
          <div className='group cursor-pointer grid place-items-center hover:stroke-glow'>
            <HomeIcon  className='stroke-foreground group-hover:stroke-glow '/>
            <span className='text-foreground group-hover:text-glow  font-dm font-semibold text-xs hidden md:block'>Home</span>
          </div>
        </a>
        






        <a href='/connections' className='group cursor-pointer grid place-items-center' title='Connections'>
          <div className='group cursor-pointer grid place-items-center'>
            <Users className='stroke-foreground group-hover:stroke-glow' />
            <span className='text-foreground group-hover:text-glow font-semibold text-xs hidden md:block'>Connections</span>
          </div>
        </a>
        
        <a className='group cursor-pointer grid place-items-center' title='Jobs' href='/jobs'>
          <div className='group cursor-pointer grid place-items-center'>
            <ScrollText className='stroke-foreground group-hover:stroke-glow' /> 
            <span className='text-foreground group-hover:text-glow font-semibold text-xs hidden md:block'>Jobs</span>
          </div>
        
        </a>

        { user &&  <a className='group cursor-pointer grid place-items-center' title='Messages' href={`/chats/threads/`} >
            <div className='group cursor-pointer grid place-items-center'>
              <MessageSquareText  className='stroke-foreground group-hover:stroke-glow' />
              <span className='text-foreground group-hover:text-glow font-semibold text-xs hidden md:block'>Messages</span>
            </div>
          </a>
        }

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
