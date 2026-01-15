import React from 'react'
import SignupCard from '../../component/card/SignupCard'


function Signup() {
  return (
    <div className='w-full h-screen flex'>
      <div className='flex flex-col flex-[0.6] bg-theme-primary items-center max-lg:flex-1 max-lg:justify-center'>
          <div className='flex mt-6 max-lg:mb-20'>
            <img src='/parul-logo.png' className='' />
          </div>
          <div className='w-[500px] h-[600px] absolute bottom-14 left-36 max-lg:relative max-lg:left-0 max-lg:bottom-0 max-md:w-[90%] max-md:mx-3 max-lg:mb-8'>
            <SignupCard />
          </div>
      </div>

      <div className='flex-1 max-lg:hidden'>
        <div className='w-full h-full flex flex-col items-center justify-center'>
          <h1 className='text-2xl text-black font-bold'>E-TRAINING AND PLACEMENT PARUL UNIVERSITY</h1>
          <img src='/pulms.png' className='' />
        </div>
      </div>
    </div>
  )
}

export default Signup