import React from 'react'
import { useSelector } from 'react-redux';
import LeftSideBar from './components/LeftSideBar';

export default function AuthHome() {
    const {user}= useSelector((state) => state.user);
    return (
      <div className='flex flex-col sm:flex-row gap-4'>
      
        <LeftSideBar/>
       <main className='md:w-3/5'>
          main
       </main>
       <div className='md:w-1/5 hidden lg:block '>
          Right sidebar 
       </div>
      </div>
    )
}
