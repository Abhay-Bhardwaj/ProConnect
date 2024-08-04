import React from 'react'
import { useSelector } from 'react-redux';

export default function LeftSideBar() {
  const {user}= useSelector((state) => state.user);
  console.log(user);
  return (
    <div className='sm:w-2/5 md:w-1/5 flex flex-col'>
        <div>
            <div className='bg-white rounded-lg m-4 p-2 flex flex-col justify-center items-center g-2'>
                <div>
                    <img src={user?.image} alt='profile' className='rounded-full h-20 w-20'/>
                </div>
                <h2 className='font-semibold text-md text-center'>{user?.firstName} {user?.lastName}</h2>
                <p className='text-sm text-center'>{user?.headline}</p>
                <hr/>
                <div className='flex gap-2 justify-between items-center'>
                  <p className='text-sm text-center'><b>Following:</b> {user?.following?.length}</p>
                  <p className='text-sm text-center'><b>Followers:</b> {user?.followers?.length}</p>
                </div>
            </div>

        </div>
        
    </div>
  )
}
