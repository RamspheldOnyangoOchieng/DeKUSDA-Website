import React from "react";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";

export const Blissful = () => {
  return (
    <>
      <Header />

      <section className="min-h-screen px-6 py-12 font-sans text-gray-800 bg-gray-100 lg:px-24">
        <div className="p-6 mx-auto max-w-5xl bg-white rounded-xl shadow-md md:p-10">
          <h1 className="mb-4 text-4xl font-bold text-blue-800">Blissful Music Group</h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            Welcome to the Blissful Music Group page at DeKUSDA. Here you'll learn more about our ministry,
            our music, and the message we share through harmonious praise. Stay tuned for events, performances,
            and spiritual moments led by the Blissful ensemble.
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Blissful;
