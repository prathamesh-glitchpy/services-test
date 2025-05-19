import React from 'react';
import { Link } from 'react-router-dom';
import Background from './Background';
import Logo from '../../assets/images/Logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebookF, faXTwitter, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <Background 
      bgColor="bg-linear-[180deg,#1C2541,#3A506B_47%,#0B132B_90%]" 
      fullHeight={false} 
      className="text-white py-10"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo Section */}
          <div className="flex flex-col items-start">
            <img src={Logo} alt="Arthasva Logo" className="h-16 mb-4" />
            
            <div className="flex space-x-4 mt-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-white w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors">
                <FontAwesomeIcon icon={faInstagram} className="h-5 w-5 text-blue-900" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-white w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors">
                <FontAwesomeIcon icon={faFacebookF} className="h-5 w-5 text-blue-900" />
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="bg-white w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors">
                <FontAwesomeIcon icon={faXTwitter} className="h-5 w-5 text-blue-900" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="bg-white w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors">
                <FontAwesomeIcon icon={faLinkedinIn} className="h-5 w-5 text-blue-900" />
              </a>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="text-left">
            <h3 className="text-lg font-bold mb-4 text-white border-b border-blue-400 pb-2 inline-block">Quick Links</h3>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-1 gap-x-4 gap-y-2">
              <Link to="/" className="hover:text-blue-300 transition-colors">Home</Link>
              <Link to="/about" className="hover:text-blue-300 transition-colors">About Us</Link>
              <Link to="/services" className="hover:text-blue-300 transition-colors">Services</Link>
              <Link to="/security" className="hover:text-blue-300 transition-colors">Security</Link>
              <Link to="/partners" className="hover:text-blue-300 transition-colors">Partners</Link>
              <Link to="/testimonials" className="hover:text-blue-300 transition-colors">Testimonials</Link>
              <Link to="/contact" className="hover:text-blue-300 transition-colors">Contact</Link>
            </div>
          </div>

          {/* Services Section - show on all screen sizes */}
          <div className="text-left">
            <h3 className="text-lg font-bold mb-4 text-white border-b border-blue-400 pb-2 inline-block">Services</h3>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-1 gap-x-4 gap-y-2">
              <Link to="/investments" className="hover:text-blue-300 transition-colors">Investments</Link>
              <Link to="/expense-tracking" className="hover:text-blue-300 transition-colors">Expense Tracking</Link>
              <Link to="/financial-health" className="hover:text-blue-300 transition-colors">Financial Health</Link>
              <Link to="/financial-goals" className="hover:text-blue-300 transition-colors">Financial Goals</Link>
              <Link to="/finance-education" className="hover:text-blue-300 transition-colors">Finance Education</Link>
            </div>
          </div>

          {/* Legals Section */}
          <div className="text-left">
            <h3 className="text-lg font-bold mb-4 text-white border-b border-blue-400 pb-2 inline-block">Legals</h3>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-1 gap-x-4 gap-y-2">
              <Link to="/privacy-policy" className="hover:text-blue-300 transition-colors">Privacy policy</Link>
              <Link to="/terms" className="hover:text-blue-300 transition-colors">Terms of Services</Link>
              <Link to="/cookie-policy" className="hover:text-blue-300 transition-colors">Cookie policy</Link>
              <Link to="/gdpr" className="hover:text-blue-300 transition-colors">GDPR Compliance</Link>
              <Link to="/security-policy" className="hover:text-blue-300 transition-colors">Security Policy</Link>
              <Link to="/accessibility" className="hover:text-blue-300 transition-colors">Accessibility</Link>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-10 pt-6 border-t border-blue-800 text-center text-sm text-gray-300">
          <p>&copy; {new Date().getFullYear()} Arthasva. All rights reserved.</p>
          <p className="mt-2">Where your money finds financial wisdom</p>
        </div>
      </div>
    </Background>
  );
};

export default Footer;