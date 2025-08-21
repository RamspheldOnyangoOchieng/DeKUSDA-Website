import dekusdachurchlogo from '../../assets/dekusdachurchlogo.png'

export const Sidebar = () => {
    return (
        <>
         <div className='w-[15%] min-h-screen bg-gradient-to-b from-primaryBlue/70 to-darkBlue flex justify-center'> 
            <img src={dekusdachurchlogo} alt="DeKUSDA Church Logo" 
            className='
            xs:w-16 xs:h-16 xs:mt-4 
            sm:w-20 sm:h-20 sm:mt-4
            md:w-24 md:h-24 md:mt-4
            lg:w-24 lg:h-24 lg:mt-4
            xl:w-32 xl:h-32 xl:mt-6 
            bg-transparent filter brightness-0 invert sepia saturate-100 hue-rotate-180 fixed'/>
        </div>
        </>
    );
}
