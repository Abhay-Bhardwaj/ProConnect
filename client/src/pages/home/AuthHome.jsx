import React from 'react'
import { useSelector } from 'react-redux';

export default function AuthHome() {
    const {user}= useSelector((state) => state.user);
    console.log(user)
    return (
      <div className='flex flex-col sm:flex-row gap-4'>
       <div className='flex flex-col'>
        <div className='bg-white rounded-sm m-4 p-4'>
          {/* <img src={userData.img} alt='user' className='w-16 h-16 rounded-full'/> */}
          <h2>{user.id}</h2>
          <h2>{user.email}</h2>
  
  
        </div>
       </div>
       <main className=''>
          main
       </main>
       <div className='hidden lg:block '>
          Right sidebar 
       </div>
      </div>
    )
}
