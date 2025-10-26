import React from 'react'
import profileImage from '../../src/assets/profile_image.jpeg'
import { BiLogoGithub, BiLogoLinkedin } from 'react-icons/bi'
import { SiBluesky } from 'react-icons/si'

const Home = () => {
  return (
    <div id= 'home' className='flex min-h-screen w-full items-center justify-center'>

      <div className='flex flex-col items-center justify-center gap-8 p-5 text-center'>

      {/* profile image */}
        <img src={profileImage} alt="" className='w-[250px] sm:w-[300px] rounded-full'/>

      {/* heading and sub-heading */}
        <div className='space-y-1 sm:space-y-3'>
        <h1 className='bg-linear-to-r  from-sky-600 to-sky-950 bg-clip-text text-4xl font-semibold text-transparent md:text-5xl lg:text-6xl'>Will Darkins</h1>
        <h3 className='bg-linear-to-r  from-sky-600 to-sky-950 bg-clip-text text-xl font-semibold text-transparent md:text-2xl lg:text-3xl'>QA & Cyber Security Professional</h3>
        <p className='max-w-[500px] text-sm text-gray-500'> Fusce volutpat posuere dolor quis rhoncus. Nullam tortor turpis, sodales in lacinia in, consequat et risus. Pellentesque rutrum tempus nisl, in tristique ante congue eget. Vestibulum ut ex ac justo vulputate ultrices sed vel.</p>
        </div>
        
      {/* social icons */}
        <div className='flex gap-3 '>
          <BiLogoGithub className='h-10 w-10 cursor-pointer rounded-full border-2 border-transparent bg-sky-950 p-2 text-white transition-all duration-200 hover:scale-110 hover:border-sky-950 hover:bg-white hover:text-sky-950 md:h-12 md:w-12'/>
          <BiLogoLinkedin className='h-10 w-10 cursor-pointer rounded-full border-2 border-transparent bg-sky-950 p-2 text-white transition-all duration-200 hover:scale-110 hover:border-sky-950 hover:bg-white hover:text-sky-950 md:h-12 md:w-12'/>
          <SiBluesky className='h-10 w-10 cursor-pointer rounded-full border-2 border-transparent bg-sky-950 p-2 text-white transition-all duration-200 hover:scale-110 hover:border-sky-950 hover:bg-white hover:text-sky-950 md:h-12 md:w-12'/>
        </div>
      </div>
    </div>
  )
}

export default Home