import React from 'react';

const Loader = () => {
  return (
    <div className=" h-screen mt-5 flex items-center justify-center">
      <div
        className="w-12 h-12 rounded-full animate-spin border-y-4 border-solid border-pink-500 border-t-transparent shadow-md">
    </div>
    </div>
  );
};

export default Loader;
