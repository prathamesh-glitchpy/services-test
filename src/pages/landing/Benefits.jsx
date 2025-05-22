import React from 'react';
import BenefitsDisplay from '/src/components/landingComponents/BenefitsDisplay';

const Benefits = () => {
  return (
    <div id='benefits' className="w-full min-h-screen text-white flex items-center justify-center md:pt-0 pt-10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-0 md:gap-10">
        {/* Left on desktop, Top on mobile: Text content */}
        <div className="md:w-1/2">
          <h2 className="text-4xl md:text-5xl font-bold mb-2">
		    ENJOY THE <span className='text-[#6FFFE9]'> SMARTER </span>WAY TO MANAGE MONEY
          </h2>
          <p className="text-base md:text-lg text-gray-200 mb-8">
		  From budgeting to investing—do it all in one place. <br />Join thousands of users making better financial decisions with ease.
          </p>
        </div>

        {/* Right on desktop, Bottom on mobile: Benefits Display */}
        <div className="md:w-1/2 w-full flex items-center justify-center">
          <div className="flex justify-center">
            <BenefitsDisplay />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Benefits;
