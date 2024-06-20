import React from 'react';

const Offline = () => {
  return (
    <div className="bg-gray-900 text-white h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-4">Offline</h1>
      <p className="text-lg">You are currently offline. Please check your internet connection.</p>
    </div>
  );
};

export default Offline;