import React from 'react'
import Image from 'next/image'
import { Avatar } from '@mui/material'

function Navbar() {
    return (
      <div className='absolute top-0 w-full font-serif bg-green-50 shadow-sm p-5'>
        <div className='flex justify-between hover:space-x-30 transition-all duration-500 items-center mx-4'>
          <p className='text-2xl cursor-pointer'>SmartCards AI</p>
          <div className='flex items-center space-x-2 '>
            <button href="#" className='text-xl hover:bg-green-100 rounded-lg p-2'>Sign Up</button>
            <span>|</span>
            <button href="#" className='text-xl  hover:bg-green-100 rounded-lg p-2'>Login</button>
          </div>
        </div>
      </div>
    );
  }
  

export default Navbar