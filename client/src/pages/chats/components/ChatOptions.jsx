import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import NewChat from './NewChat'

export default function ChatOptions() {
    const [search, setSearch] = useState('')

  return (
    <div className='flex flex-row gap-2 justify-between mb-2'>
        <div className='flex flex-row gap-2 h-min'>
            <h3 className='font-semibold text-xl'>
                Messages
            </h3>
            <div>
                <Input type='search' className='p-2 border-2 border-gray-200 rounded-md h-[32px] text-sm' placeholder='Search' value={search} onChange={e=>setSearch(e.target.value)}/>
            </div>
        </div>
        <div className=''>
            <NewChat/>
        </div>
    </div>
  )
}
