import React, { useEffect, useState } from 'react'
import ChatList from './components/ChatList'
import OpenChat from './components/OpenChat'
import ChatOptions from './components/ChatOptions'

const ChatsContainer = () => {
  const [search, setSearch] = useState('')
  return (
    <div className='p-4 grid place-items-center'>
      <div className='bg-white rounded-lg  h-[80vh] w-[80vw] flex flex-col p-4'>
        <ChatOptions/>
        <hr/>
        <div className='flex flex-row'>
          <ChatList/>
          <OpenChat/>
        </div>
        
      </div>
    </div>
  )
}

export default ChatsContainer