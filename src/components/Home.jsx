import React from 'react'
import profileImage from '../../public/profile_image.jpeg'

const Home = () => {
  return (
    <div id= 'home' className='flex min-h-screen w-full items-center justify-center'>

      <div className='flex flex-col items-center justify-center gap-8 p-5 text-center'>

        <img src={profileImage} alt="" className='w-[250px] sm:w-[300px] rounded-full'/>

        <div className='space-y-1 space-y-3'>
        <h1>Will Darkins</h1>
        <h3>QA & Cyber Security Professional</h3>
        <p> Fusce volutpat posuere dolor quis rhoncus. Nullam tortor turpis, sodales in lacinia in, consequat et risus. Pellentesque rutrum tempus nisl, in tristique ante congue eget. Vestibulum ut ex ac justo vulputate ultrices sed vel metus. Suspendisse condimentum mi feugiat eros porta facilisis. Maecenas eleifend suscipit ipsum, non congue mauris luctus at. Proin tellus lectus, interdum at suscipit pulvinar, porta luctus nunc. Fusce commodo imperdiet aliquet. Vestibulum porta turpis dignissim, interdum justo a, dignissim mi. </p>
        </div>
        
      </div>
    </div>
  )
}

export default Home