//import {Link} from 'react-router-dom';
import facebookIcon from '../../assets/facebookIcon.png';
import twitterIcon from '../../assets/twitterIcon.png';
import whatsappIcon from '../../assets/whatsappIcon.png';
import instagramIcon from '../../assets/instagramIcon.png';
import youtubeIcon from '../../assets/youtubeIcon.png';
export const Footer = () => {
    return(
        <>
        <footer className='bg-blue-500 h-96'>
            <p className='p-4 font-sans text-2xl font-bold text-white'>Useful handles</p>

            <div className='flex'>
            <div className='flex space-x-2'>
            <img src={facebookIcon} alt="facebook icon" className='p-3 ml-2 bg-transparent border-2 border-white rounded-full h-14 w-14'/>
            <img src={twitterIcon} alt="twitter icon" className='p-1 bg-transparent border-2 border-white rounded-full h-14 w-14'/>
            <img src={whatsappIcon} alt="whatsapp icon" className='p-1 bg-transparent border-2 border-white rounded-full h-14 w-14'/>
            <img src={instagramIcon} alt="instagram icon" className='p-2 bg-transparent border-2 border-white rounded-full h-14 w-14'/>
            <img src={youtubeIcon} alt="youtube icon" className='p-3 bg-transparent border-2 border-white rounded-full h-14 w-14'/>
            </div>

            <div className='justify-end ml-auto mr-10'>
                <p className='text-2xl font-bold text-white'>Subscribe Now</p>
                <p className='text-white'>Don't miss out on our{" "}<span>future updates today.</span></p>
                <input placeholder='Your e-mail here' className='p-2 mt-2 rounded-full w-80' />
            </div>
            </div>

        </footer>
        <div className='text-white bg-blue-900 '>
        <div className='flex items-center h-12 ml-32'>
            &copy;{new Date().getFullYear()}.DeKUSDA Church. All rights reserved.</div>
        </div>
        </>
    );
}