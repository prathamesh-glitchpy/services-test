import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';

function ComingSoon() {
  const navigate = useNavigate();
  
  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <h1 className="text-white text-4xl md:text-5xl font-bold text-primary mb-4">Coming Soon</h1>
      <p className="text-white text-xl md:text-2xl mb-8 max-w-2xl">
        We're working hard to bring you this page. Please check back later!
      </p>
      <div className="w-24 h-1 bg-primary mx-auto my-6"></div>
      <p className="mb-8 text-black">
        The page you're looking for is under development.
      </p>
      <Button 
	    text={"Back to Home"}
        onClick={handleBackToHome}
        bgColor="#6FFFE9" 
		hoverBgColor="#5aebe9" 
		className="text-gray-900 font-semibold text-xl md:text-2xl" 
		width="w-48 sm:w-56" 
		height="h-12 sm:h-14"
		rounded="rounded-full"
      >
      </Button>
    </div>
  );
}

export default ComingSoon;