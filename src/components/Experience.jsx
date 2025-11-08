import React from 'react'

const Experience = () => {
  return (
    <div id='experience' className='flex min-h-screen w-full flex-col items-center justify-center gap-20 p-14 md:p-20 lg:p-36'>
      <h1 className='text-center text-5xl font-light '>Experience</h1>

      <div className="flex flex-wrap gap-0 md:flex-nowrap md:gap-10 ">
        <div className="flex-1"></div>
        <div className="relative space-y-1 border-l-2 p-8 text-left">
          <h3 className='experience-header'>Experience 1</h3>
          <p className='experience-title'>Job Title</p>
          <p className='experience-description'>Ut ullamco ad id sit. Commodo occaecat officia ad veniam ea consectetur id laborum mollit velit do eiusmod aute adipisicing. Mollit laborum nisi dolor exercitation pariatur aliquip veniam ut fugiat irure irure reprehenderit. Cillum id quis ipsum anim ea ea irure mollit.</p>
          <span className="experience-dot"></span>
        </div>
        <div className="flex-1"></div>
      </div>
    </div>
  )
}

export default Experience