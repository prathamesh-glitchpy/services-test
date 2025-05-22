import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '/src/components/common/Button';
import Card from '/src/components/common/Card';
import Logo from '/src/assets/images/Logo.png';

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value })); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login form submitted:', formData);
    navigate('/home');
  };

  return (
    <div className="w-full min-h-dvh flex items-center justify-center py-8">
      <Card 
        className="max-w-4xl w-full shadow-xl mx-4 md:flex md:flex-row"
        padding="p-8"
        bgColor="bg-linear-[45deg,#1e2b45_31%,#273b64_50%,#44818d_76%,#4a9a9c_100%]"
      >
        {/* Left side - Logo at top left and text centered vertically */}
        <div className="md:w-1/2 md:pr-8 flex flex-col mb-8 md:mb-0 relative">
          {/* Logo positioned at the top left */}
          <div className="mb-6 text-left">
            <img src={Logo} alt="Arthasva Logo" className="h-16" />
          </div>
          
          {/* Vertically centered text content */}
          <div className="text-center md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full">
            <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
            <p className="text-gray-300 mt-2">Log in to access your account</p>
          </div>
        </div>
        
        {/* Right side - Form */}
        <div className="md:w-1/2 md:pl-8 md:border-l md:border-gray-700">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-gray-200 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-[#2D1F3A] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00718A]"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-gray-200 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-[#2D1F3A] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00718A]"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center text-gray-300">
                <input type="checkbox" className="mr-2" />
                Remember me
              </label>
              <a href="#" className="text-[#6FFFE9] hover:text-[#5BC0BE] transition-colors">
                Forgot password?
              </a>
            </div>

            <Button 
              text="LOGIN" 
              width="w-full"
              bgColor="#00718A" 
              hoverBgColor="#005d73" 
              className="!text-[#6FFFE9] text-base font-medium mt-6" 
              height="h-12"
              rounded="rounded-full"
              type="submit"
            />

            <div className="text-center mt-6">
              <p className="text-gray-300">
                Don't have an account?{' '}
                <Link to="/register" className="text-[#6FFFE9] hover:text-[#5BC0BE] transition-colors">
                  Register
                </Link>
              </p>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default Login;