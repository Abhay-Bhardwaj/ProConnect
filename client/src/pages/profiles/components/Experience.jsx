import React from 'react'

export default function Experience({item}) {
  return (
    <div className='w-full h-min p-2 flex flex-row gap-2'>
        <div>
            <img src={item.image? item?.image:'/src/assets/demo-Company-logo.png'} className='w-24' alt={item.title}/>
        </div>
        <div className='flex flex-col'>
            <h3 className='text-lg font-semibold'>{item.title}</h3>
            <div>
                <h4 className='text-lg '>{item.company}</h4>
            </div>
            <div className='flex flex-row'>
                <span className='flex flex-row text-sm text-gray-600'>{new Date(item.from).toLocaleDateString()} - {item.current ? 'Present' : new Date(item.to).toLocaleDateString()}</span>
                {/* <p>{new Date(item.from).toLocaleDateString()} - {item.current ? 'Present' : new Date(item.to).toLocaleDateString()}</p> */}
            </div>
            <h4 className='text-sm text-gray-600'>{item.location}</h4>
        </div>
    </div>
  )
}
