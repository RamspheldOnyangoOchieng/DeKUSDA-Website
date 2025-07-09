import React from 'react';
import { Header } from '../../components/Layout/Header';
import { Footer } from '../../components/Layout/Footer';
import pastorImage from '../../assets/pastor-frank.png';

export const PastorMessage = () => {
  return (
    <>
      <Header />

      <section className="min-h-screen px-6 py-12 font-sans text-gray-800 bg-gray-100 lg:px-24">
        <div className="p-6 mx-auto max-w-5xl bg-white rounded-xl shadow-md md:p-10">
          {/* Top section: Image on the left, text on the right */}
          <div className="flex flex-col gap-6 items-start mb-8 md:flex-row">
            <img
              src={pastorImage}
              alt="Pastor Frank Maina"
              className="w-48 h-auto rounded-lg shadow-sm"
            />
            <div>
              <h1 className="text-xl text-gray-500 uppercase font-semibold">Chaplain</h1>
              <h2 className="text-3xl font-bold text-blue-800 mb-2">Message from the Chaplain</h2>
              <h3 className="text-lg font-semibold text-gray-600">Pastor Frank Maina</h3>
              <p className="mt-2 italic text-gray-500">
                “The fear of the Lord is the beginning of wisdom.”
              </p>
            </div>
          </div>

          {/* Body content */}
          <div className="text-lg text-gray-700 space-y-6">
            <p>Hello there.</p>

            <p>
              Welcome to <span className="font-semibold text-blue-600">Dedan Kimathi University Seventh-Day Adventist Church</span>.
              We're here to support Adventist students in finding space for spiritual exploration and nourishment — reminding you that,
              <span className="italic"> “The fear of the Lord is the beginning of wisdom.”</span>
            </p>

            <p>
              Here, we are nurturing <span className="font-semibold">spirit</span>, <span className="font-semibold">soul</span>, and <span className="font-semibold">service</span>.
              Our Chaplaincy department offers pastoral care, spiritual programs, and opportunities for service — embracing diversity and fostering well-being.
            </p>

            <p>
              May the good Lord bless you for visiting this site.
            </p>

            <div className="text-right mt-6">
              <p className="text-xl font-medium text-gray-800">Pastor Frank Maina,</p>
              <p className="text-gray-700">Chaplain</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default PastorMessage;
