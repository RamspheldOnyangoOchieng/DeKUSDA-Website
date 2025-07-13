import React from 'react';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';

const AMO_ALO = () => {
  return (
    <>
      <Header />
      <main className="px-6 py-10">
        <h1 className="text-3xl font-bold text-blue-900 text-center">AMO / ALO Department</h1>
        {/* Add your department content here */}
      </main>
      <Footer />
    </>
  );
};

export default AMO_ALO; // ✅ This line is required
