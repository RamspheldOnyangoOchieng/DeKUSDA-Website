import DekusdaImage from '../assets/Dekusda.jpg';
import Dekusda2 from '../assets/Dekusda2.jpg';
import Dekusda3 from '../assets/Dekusda3.jpg';
import { Header } from '../components/Layout/Header';
import { Footer } from '../components/Layout/Footer';

export const Home = () => {
    return (
        <>
            <Header />
            <img src={DekusdaImage} alt="sda church logo" className="max-h-svh w-full object-cover" />

            <section className="bg-gradient-to-r from-yellow-100 via-red-50 to-green-50 min-h-96 py-8">
                <div className="flex flex-col md:flex-row items-center justify-center max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center md:ml-20 pt-8 md:pt-16">
                        <img src={Dekusda2} alt="" className="h-52 w-52 rounded-xl shadow-lg border-4 border-yellow-600" />
                        <img src={Dekusda3} alt="" className="h-40 w-40 mt-8 md:mt-20 -ml-0 md:-ml-20 rounded-xl shadow-lg border-4 border-red-600" />
                    </div>
                    <div className="md:ml-16 mt-8 md:mt-0 max-w-xl">
                        <p className="text-red-700 font-bold text-lg mb-2 tracking-wide">A snippet of us</p>
                        <p className="text-3xl font-extrabold bg-gradient-to-r from-yellow-600 via-red-600 to-green-900 bg-clip-text text-transparent mb-2">We Preach the Gospel in Every Sermon</p>
                        <p className="text-green-900 font-semibold mb-2">1st Thessalonians 4: 11-12</p>
                        <p className="text-neutral-700 mb-2">
                            Make it your aim to live a quiet life, to mind your own business, and to earn your own living,
                            just as we told you before. In this way you will earn the respect of those who are not believers,
                            and you will not have to depend on anyone for what you need.
                        </p>
                        <p className="text-neutral-600 italic">(Good News Bible)</p>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Home;