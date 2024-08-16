"use client"
import React from 'react'
import { Button } from '@mui/material'
import { useRouter } from 'next/navigation'

function Navbar() {
  const router = useRouter();
  const handleSignUp = () => {
    router.push('/sign-up'); 
  };

  const handleSignIn = () => {
    router.push('/sign-in');
  };

    return (
      <div className='absolute top-0 w-full font-serif bg-green-50 shadow-sm p-5'>
        <div className='flex justify-between hover:space-x-30 transition-all duration-500 items-center mx-4'>
          <p className='text-2xl cursor-pointer'>SmartCards AI</p>
          <div className='flex items-center space-x-2 '>
            <Button onClick={handleSignUp} className='text-lg text-black hover:bg-green-100 rounded-lg '>Sign Up</Button>
            <span>|</span>
            <Button onClick={handleSignIn} className='text-lg text-black  hover:bg-green-100 rounded-lg '>Login</Button>
          </div>
        </div>
      </div>
    );
  }
  

export default Navbar