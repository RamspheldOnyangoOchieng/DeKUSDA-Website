import { FaFacebook, FaYoutube, FaInstagram, FaTwitter, FaWhatsapp } from 'react-icons/fa';


export const Footer = () => {
    return(
        <>
        <footer className='
        xs:-mt-8 xs:h-auto xs:pb-4 xs:block 
        sm:
        md:h-[26%] md:mt-0
        lg:
        xl:h-72
        bg-blue-900'>

            <div className='xs:block sm:block md: lg: xl:flex'>
                <div className='text-white '>
                    <p className='
                    xs:text-md xs:pt-8 xs:ml-4
                    sm:text-lg sm:ml-4
                    md:text-lg md:ml-2
                    lg:text-lg lg:ml-4
                    xl:mt-6 xl:ml-6 xl:mr-20 xl:text-lg'>
                        <span className='block'>www.dekusda.org is the official website of</span>
                        <span className='block'>Dedan Kimathi University of Technology</span>
                        <span className='block'>Seventh Day Adventist Church.</span>
                    </p>
                </div>

                <div className=''>
                    <div className='
                xs:mt-6 xs:text-xl
                sm:mt-4 sm:ml-0
                md:ml-[50%] md:-mt-[6.4rem]
                lg:ml-[48%] lg:-mt-[6.5rem]
                xl:mt-10 mr-20 xl:-ml-6'>
                    <p className='
                      sm:text-2xl md:2xl lg:text-2xl xl:text-2xl 
                    text-white p-4 font-sans font-bold'>Useful handles</p>

                    <div className='flex space-x-2 sm:ml-[10px] md:ml-[12px] lg:ml-[16px]'>
                    
                     <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                     className='
                        xs:text-3xl
                        sm:text-3xl
                        md:text-3xl
                        lg:text-3xl
                        xl:text-4xl
                        '>
                        <FaFacebook />
                    </a>

                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                    className='
                        xs:text-3xl 
                        sm:text-3xl
                        md:text-3xl
                        lg:text-3xl
                        xl:text-4xl'>
                        <FaTwitter />
                    </a>

                    <a href="https://chat.whatsapp.com/ILydxcM2OmlDT4Z0egZhNu?mode=ac_c">
                        <a href="https://wa.me/your-number" target="_blank" rel="noopener noreferrer"
                        className='
                        xs:text-3xl
                        sm:text-3xl
                        md:text-3xl
                        lg:text-3xl
                        xl:text-4xl'>
                        <FaWhatsapp />
                    </a>
                    </a>

                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                    className='
                        xs:text-3xl
                        sm:text-3xl
                        md:text-3xl
                        lg:text-3xl
                        xl:text-4xl'>
                        <FaInstagram />
                    </a>


                    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"
                    className='
                        xs:text-3xl
                        sm:text-3xl
                        md:text-3xl
                        lg:text-3xl
                        xl:text-4xl'>
                        <FaYoutube />
                    </a>
                    </div>
                </div>
                </div>

                <div className='
                xs:mt-8 xs:ml-4
                sm:mt-10
                md:ml-[52%]
                lg:ml-[49%]
                xl:mt-14 xl:-ml-0'>
                    <p className='
                    xs:text-xl 
                    sm:text-2xl
                    md:
                    lg:text-2xl
                    xl:text-2xl 
                    text-white font-bold'>
                        Subscribe Now
                    </p>
                    <p className='
                    xs:text-sm
                    sm:text-lg
                    md:text-[1rem]
                    lg:text-lg
                    xl:text-lg
                  text-white'>
                        Don't miss out on our future updates today.
                    </p>
                    <input placeholder='Your e-mail here' className=' xs:w-[17rem] sm:w-[22rem] md:w-[19.5rem] 
                    lg:w-[22rem] xl:w-[22rem] p-2 rounded-full mt-2'/>
                    <div>
                        <button className='text-white rounded-full p-2 bg-blue-500 mt-2'>Submit</button>
                    </div>
                </div>
        
            </div>

            <div className='
                    xs:text-xs xs:ml-4 xs:mt-10
                    sm:text-sm sm:ml-4 sm:mt-10
                    md:-mt-10 md:ml-2
                    lg:ml-4
                    xl:text-sm xl:ml-6 xl:-mt-2
                    text-white'>
                        <span className='block'>&copy;{new Date().getFullYear()}.DeKUSDA Church. 
                            All rights reserved.</span>
                        <span className='block'>Nyeri, Kenya.</span>
                    </div>
        </footer>
        </>
    );
}