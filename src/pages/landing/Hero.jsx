import React from 'react';
import Button from '/src/components/common/Button';
import PrototypeDisplay from '/src/components/LandingComponents/PrototypeDisplay';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/login');
  };

	return (
	  <div id="home" className="w-full h-screen flex items-center justify-center pt-20 md:pt-0">
		<div className="container mx-auto px-4 flex flex-col md:flex-row items-center md:items-center justify-between">
		  {/* Left Part - Text Content */}
		  <div className="text-center md:text-left md:w-1/2 z-10 font-[MuktaVaani]">
			<h2 className="text-4xl md:text-5xl font-bold text-[#6FFFE9] mb-2">
			  EASIEST & TRUSTED
			</h2>
			<h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
			  FINANCE MANAGER EVER
			</h1>
			<p className="text-lg md:text-xl text-gray-200 max-w-2xl mb-8">
			  Helping hand to manage your Money, Investments, and Spending 
			  from one dashboard
			</p>
			<div className="flex justify-center md:justify-start">
			  <Button 
				text="GET STARTED" 
				bgColor="#6FFFE9" 
				hoverBgColor="#5aebe9" 
				className="text-gray-900 font-semibold text-xl md:text-2xl" 
				width="w-48 sm:w-56" 
				height="h-12 sm:h-14"
				rounded="rounded-full"
				onClick={handleGetStarted}
			  />
			</div>
		  </div>
		  
		  {/* Right Part - Prototype Display */}
		  <div className="md:w-1/2 mt-10 md:mt-0 z-10">
			<PrototypeDisplay />
		  </div>
		</div>
	  </div>
	);
  };
  
  export default Hero;