import React from 'react';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';

export default function Prophecy() {
  return (
    <>
      <Header />
      <main className="px-6 py-10 mx-auto max-w-5xl font-sans min-h-screen bg-gray-50">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-6">Prophecy Department</h2>
        <p className="text-gray-700 text-lg">
          Welcome to the Prophecy Department of DeKUSDA Church. This section is dedicated to interpreting biblical prophecy,
          guiding members to understand end-time events in light of the Bible and the Spirit of Prophecy.
        </p>
      </main>
      <Footer />
    </>
  );
}
