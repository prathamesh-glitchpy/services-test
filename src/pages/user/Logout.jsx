import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Simulate logout process
    setTimeout(() => {
      // Redirect to home page after logout
      navigate('/');
    }, 2000);
  }, [navigate]);

  return (
    <div className="flex justify-center items-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Logging Out...</h1>
        <p className="mt-4">You will be redirected to the home page shortly.</p>
      </div>
    </div>
  );
};

export default Logout;