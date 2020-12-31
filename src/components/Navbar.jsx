import React from 'react';

function Navbar({ children }) {
  return (
    <header className="py-1 px-auto bg-white border-b border-gray-400">
      <div className="relative flex justify-between items-center mx-auto px-4 lg:max-w-screen-lg text-gray-800">
        <h1 className="sm:text-2xl font-bold tracking-widest">
          COMPOSER'S REFERENCE
        </h1>
        {children}
      </div>
    </header>
  );
}

export default Navbar;
