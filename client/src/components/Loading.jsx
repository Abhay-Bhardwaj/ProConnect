import { Loader } from 'lucide-react'
import React from 'react'

export default function Loading() {
  return (
    <div className='fixed top-0 right-0 h-screen w-screen bg-white z-50 grid place-items-center'>
        <Loader className='h-[100px] w-[100px] animate-spin-slow stroke-glow' />
    </div>
  )
}
