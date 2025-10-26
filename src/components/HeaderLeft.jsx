import React from 'react'
import { BiRightArrowAlt } from 'react-icons/bi'

const HeaderLeft = () => {
  return (
    <div className='md:flex-1'>
      <div className='min-h-screen top-0 hidden md:sticky md:flex items-center justify-center bg-sky-950 text-white'>
        <ul className='flex flex-col gap-10'>
          {['home', 'experience', 'projects', 'contact'].
          map((item)=> (
            <li key={item} className='flex items-center justify-start cursor-pointer font-medium transition-all duration-200 group sm:text-lg md:text-xl xl:text-3xl'>
              <BiRightArrowAlt className='text-4xl -translate-x-5 opacity-0 transform transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0'/>

              <a href={`#${item}`} className='transition-all duration-200 hover:translate-x-3'>{item}</a>
              
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default HeaderLeft