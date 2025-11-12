import profileImage from '../../src/assets/profile_image.jpeg'
import SocialIcon from "./SocialIcon";
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
        <h1 className='heading-primary'>Will Darkins</h1>
        <h3 className='heading-sub '>QA & Cyber Security Professional</h3>
        <p className='text-muted'> Fusce volutpat posuere dolor quis rhoncus. Nullam tortor turpis, sodales in lacinia in, consequat et risus. Pellentesque rutrum tempus nisl, in tristique ante congue eget. Vestibulum ut ex ac justo vulputate ultrices sed vel.</p>
        </div>
        
      {/* social */}
<div className="flex gap-3">
  <SocialIcon Icon={BiLogoGithub} href="https://github.com/willdarkins" />
  <SocialIcon Icon={BiLogoLinkedin} href="https://www.linkedin.com/in/will-darkins/" />
  <SocialIcon Icon={SiBluesky} href="https://bsky.app/profile/willdarkins.bsky.social" />
</div>
      </div>
    </div>
  )
}

export default Home