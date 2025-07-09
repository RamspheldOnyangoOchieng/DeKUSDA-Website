import React from 'react';

const Evangelism = () => {
  return (
    <section className="max-w-5xl mx-auto px-6 py-10 bg-white rounded-2xl shadow-md">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Evangelism Department Message
      </h2>

      {/* Fixed image tag */}
      <div className="flex justify-center mb-6">
        <img
          src="/images/evangelism-team.png"
          alt="Evangelism Team"
          className="w-72 rounded-xl shadow-md"
        />
      </div>

      <p className="text-gray-700">
        Welcome to the Evangelism Department!
      </p>
    </section>
  );
};

export default Evangelism;
