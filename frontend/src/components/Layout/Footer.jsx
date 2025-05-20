//import {Link} from 'react-router-dom';
import facebookIcon from '../assets/facebookIcon.png'
import twitterIcon from '../assets/twitterIcon.png'
import whatsappIcon from '../assets/whatsappIcon.png'
import instagramIcon from '../assets/instagramIcon.png'
import youtubeIcon from '../assets/youtubeIcon.png'
export const Footer = () => {
    return(
        <>
        <footer className='bg-blue-500 h-96'>
            <p className='text-white p-4 font-sans font-bold text-2xl'>Useful handles</p>

            <div className='flex'>
            <div className='flex space-x-2'>
            <img src={facebookIcon} alt="facebook icon" className='h-14 w-14 bg-transparent border-2
             border-white rounded-full p-3 ml-2'/>
            <img src={twitterIcon} alt="twitter icon" className='h-14 w-14 bg-transparent border-2
             border-white rounded-full p-1'/>
            <img src={whatsappIcon} alt="whatsapp icon" className='h-14 w-14 bg-transparent border-2
             border-white rounded-full p-1'/>
            <img src={instagramIcon} alt="instagram icon" className='h-14 w-14 bg-transparent border-2
             border-white rounded-full p-2'/>
            <img src={youtubeIcon} alt="youtube icon" className='h-14 w-14 bg-transparent border-2
             border-white rounded-full p-3'/>
            </div>

            <div className='justify-end ml-auto mr-10'>
                <p className='text-white text-2xl font-bold'>Subscribe Now</p>
                <p className='text-white'>Don't miss out on our{" "}<span>future updates today.</span></p>
                <input placeholder='Your e-mail here' className='p-2 rounded-full mt-2 w-80' />
            </div>
            </div>

        </footer>
        <div className='bg-blue-900 text-white '>
        <div className='flex items-center h-12 ml-32'>
            &copy;{new Date().getFullYear()}.DeKUSDA Church. All rights reserved.</div>
        </div>
        </>
    );
}