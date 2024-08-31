import React from 'react'

export default function ConnectionOption({setOption, selectedOption}) {

    const handleClick=(e)=>{
        setOption(e.target.id);
    }

  return (
    <div className='grid grid-cols-4 transition-all border-t-2'>
        <div onClick={(e)=>handleClick(e)} id='following' className={`p-2 hover:bg-input rounded-b-lg cursor-pointer ${selectedOption==='following'? 'bg-input text-white': 'bg-white'} transition-all`}>
            Following
        </div>
        <div onClick={(e)=>handleClick(e)} id='followers' className={`p-2 hover:bg-input rounded-b-lg cursor-pointer ${selectedOption==='followers'? 'bg-input text-white': 'bg-white ' } transition-all`}>
            Followers
        </div>

    </div>
  )
}
