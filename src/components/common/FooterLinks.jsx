import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Logo from '/src/assets/images/Logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebookF, faXTwitter, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

const FooterLinks = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const quickLinks = [
    { name: 'Home', path: 'home', isSection: true },
    { name: 'Features', path: 'features', isSection: true },
    { name: 'Benefits', path: 'benefits', isSection: true },
    { name: 'Services', path: 'services', isSection: true },
    { name: 'Security', path: '/security', isSection: false },
    { name: 'Contact Us', path: 'contact', isSection: true },
  ];

  // Handle scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Section found on current page, scroll to it
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (location.pathname !== '/') {
      // Section not found and we're not on homepage, navigate to homepage first
      navigate('/', { state: { scrollTo: sectionId } });
    } else {
      // We're already on homepage but section wasn't found
      console.log(`Section #${sectionId} not found`);
    }
  };
  
  // Handle scrolling when navigating from another page
  useEffect(() => {
    if (location.state?.scrollTo) {
      const sectionId = location.state.scrollTo;
      
      // Set a small timeout to ensure DOM is fully loaded
      const timer = setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          // Clear the state so subsequent navigation doesn't trigger scrolling
          navigate(location.pathname, { replace: true, state: {} });
        }
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [location, navigate]);

  // Function to handle navigation
  const handleNavigation = (link, e) => {
    if (link.isSection) {
      e.preventDefault();
      scrollToSection(link.path);
    }
    // For regular links, the Link component handles navigation
  };

  const serviceLinks = [
    { name: 'Portfolio Overview', path: '/portfolio-overview' },
    { name: 'Investments', path: '/your-investments' },
    { name: 'Expense Tracking', path: '/expenses-tracking' },
    { name: 'Financial Goals', path: '/financial-goals' },
    { name: 'Financial Education', path: '/financial-education' },
  ];

  const legalLinks = [
    { name: 'Privacy policy', path: '/privacy-policy' },
    { name: 'Terms of Services', path: '/terms' },
    { name: 'Cookie policy', path: '/cookie-policy' },
    { name: 'GDPR Compliance', path: '/gdpr' },
    { name: 'Security Policy', path: '/security-policy' },
    { name: 'Accessibility', path: '/accessibility' },
  ];

  const socialLinks = [
    { icon: faInstagram, url: 'https://instagram.com' },
    { icon: faFacebookF, url: 'https://facebook.com' },
    { icon: faXTwitter, url: 'https://x.com' },
    { icon: faLinkedinIn, url: 'https://www.linkedin.com/company/arthasva/' },
  ];

  return (
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo Section */}
          <div className="flex flex-col items-center sm:items-start">
            <img src={Logo} alt="Arthasva Logo" className="h-16 mb-4" />
            
            <div className="flex justify-center sm:justify-start space-x-4 mt-4 w-full">
              {socialLinks.map((social, index) => (
                <a 
                  key={index} 
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-white w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
                >
                  <FontAwesomeIcon icon={social.icon} className="h-5 w-5 text-blue-900" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="text-left">
            <h3 className="text-lg font-bold mb-4 text-white border-b border-blue-400 pb-2 inline-block">Quick Links</h3>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-1 gap-x-4 gap-y-2">
              {quickLinks.map((link, index) => (
                <div key={index} className="whitespace-nowrap overflow-hidden">
                  <Link 
                    to={link.path} 
                    className="text-white hover:text-blue-300 transition-colors inline-block"
                    onClick={(e) => handleNavigation(link, e)}
                  >
                    {link.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Services Section */}
          <div className="text-left">
            <h3 className="text-lg font-bold mb-4 text-white border-b border-blue-400 pb-2 inline-block">Services</h3>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-1 gap-x-4 gap-y-2">
              {serviceLinks.map((link, index) => (
                <div key={index} className="whitespace-nowrap overflow-hidden">
                  <Link 
                    to={link.path} 
                    className="text-white hover:text-blue-300 transition-colors inline-block"
                  >
                    {link.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Legals Section */}
          <div className="text-left">
            <h3 className="text-lg font-bold mb-4 text-white border-b border-blue-400 pb-2 inline-block">Legals</h3>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-1 gap-x-4 gap-y-2">
              {legalLinks.map((link, index) => (
                <div key={index} className="whitespace-nowrap overflow-hidden">
                  <Link 
                    to={link.path} 
                    className="text-white hover:text-blue-300 transition-colors inline-block"
                  >
                    {link.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="my-5 pt-6 border-t border-blue-800 text-center text-sm text-gray-300">
          <p>&copy; {new Date().getFullYear()} Arthasva. All rights reserved.</p>
          <p className="mt-2">Where your money finds financial wisdom</p>
        </div>
      </div>
  );
};

export default FooterLinks;