import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="w-full max-w-[1440px] mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
      {/* This div provides spacing below the navbar */}
      <div className="pt-26 pb-6 px-2 sm:px-6 md:px-12 lg:px-24">
        {children}
      </div>
    </div>
  );
};

export default Layout;