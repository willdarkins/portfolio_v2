import React from 'react'
import profileImage from '../../public/profile_image.jpeg'

const Home = () => {
  return (
    <div id= 'home' className='flex min-h-screen w-full items-center justify-center'>

      <div className='flex flex-col items-center justify-center gap-8 p-5 text-center'>

        <img src={profileImage} alt="" className='w-[250px] sm:w-[300px] rounded-full'/>

        <div className='space-y-1 sm:space-y-3'>
        <h1 className='bg-linear-to-r  from-sky-800 to-sky-950 bg-clip-text text-4xl font-semibold text-transparent md:text-5xl lg:text-6xl'>Will Darkins</h1>
        <h3 className='bg-linear-to-r  from-sky-800 to-sky-950 bg-clip-text text-xl font-semibold text-transparent md:text-2xl lg:text-3xl'>QA & Cyber Security Professional</h3>
        <p className='max-w-[500px] text-sm text-gray-500'> Fusce volutpat posuere dolor quis rhoncus. Nullam tortor turpis, sodales in lacinia in, consequat et risus. Pellentesque rutrum tempus nisl, in tristique ante congue eget. Vestibulum ut ex ac justo vulputate ultrices sed vel.</p>
        </div>
        
      </div>
    </div>
  )
}

export default Home