import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="container mx-auto px-4">
      {/* This div provides spacing below the navbar */}
      <div className="pt-26 px-0 sm:px-24">
        {children}
      </div>
    </div>
  );
};

export default Layout;