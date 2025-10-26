import React from 'react'
import profileImage from '../../public/profile_image.jpeg'

const Home = () => {
  return (
    <div id= 'home' className='flex min-h-screen w-full items-center justify-center'>

      <div className='flex flex-col items-center justify-center gap-8 p-5 text-center'>
        <img src={profileImage} alt="" className='w-[250px] sm:w-[300px] rounded-full ' />
      </div>
    </div>
  )
}

export default Home