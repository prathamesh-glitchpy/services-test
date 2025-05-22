import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import Logo from '/src/assets/images/Logo.png';
import LogoWithoutText from '/src/assets/images/logo_without_text.png';
import Button from '/src/components/common/Button';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Clear body overflow setting when component unmounts
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);
  
  // Handle scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Section found on current page, scroll to it
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    } else if (location.pathname !== '/') {
      // Section not found and we're not on homepage, navigate to homepage first
      navigate('/', { state: { scrollTo: sectionId } });
      setIsMobileMenuOpen(false);
    } else {
      // We're already on homepage but section wasn't found
      console.log(`Section #${sectionId} not found`);
      setIsMobileMenuOpen(false);
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
  
  // Ensure body scrolling is properly restored
  useEffect(() => {
    if (!isMobileMenuOpen) {
      document.body.style.overflow = '';
    }
  }, [isMobileMenuOpen]);
  
  // Toggle mobile menu and prevent body scrolling when menu is open
  const toggleMobileMenu = () => {
    const newMenuState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newMenuState);
    
    // Prevent scrolling when menu is open
    if (newMenuState) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };
  
  return (
    <div className="w-full fixed top-0 left-0 flex justify-center pt-4 z-50">
      <div 
        className="w-[95%] rounded-4xl bg-[#170D1C]/50 px-6 py-4 relative flex items-center"
        style={{ backdropFilter: 'blur(10px)' }}
      >
        {/* Logo - Desktop */}
        <div className="hidden md:flex items-center">
          <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>
            <img src={Logo} alt="Company Logo" className="h-10 mr-4" />
          </a>
        </div>

        {/* Mobile Navbar Layout */}
        <div className="md:hidden flex items-center justify-between w-full">
          {/* Logo - Mobile */}
          <div className="flex items-center">
            <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>
              <img src={LogoWithoutText} alt="Company Logo" className="h-8" />
            </a>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="text-white focus:outline-none p-2 relative z-[100] bg-gray-700/70 rounded"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <FontAwesomeIcon 
              icon={faBars} 
              className="h-5 w-5" 
            />
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center space-x-8">
          <NavLink text="HOME" onClick={() => scrollToSection('home')} />
          <NavLink text="FEATURES" onClick={() => scrollToSection('features')} />
          <NavLink text="BENEFITS" onClick={() => scrollToSection('benefits')} />
          <NavLink text="SERVICES" onClick={() => scrollToSection('services')} />
          <NavLink text="CONTACT" onClick={() => scrollToSection('contact')} />
        </div>

        <div className="hidden md:flex items-center ml-auto space-x-4">
          {/* Auth Buttons - desktop only */}
          <Link to="/login">
            <Button 
              text="LOGIN" 
              bgColor="#00718A" 
              hoverBgColor="#005d73" 
              className="!text-[#6FFFE9] text-base font-medium" 
              width="w-28" 
              height="h-10"
              rounded="rounded-full"
            />
          </Link>
          <Link to="/register">
            <Button 
              text="REGISTER" 
              bgColor="#00718A" 
              hoverBgColor="#005d73" 
              className="!text-[#6FFFE9] text-base font-medium" 
              width="w-28" 
              height="h-10"
              rounded="rounded-full"
            />
          </Link>
        </div>
      </div>
      
      {/* Mobile Menu - Full Screen Overlay */}
      <div className={`fixed inset-0 bg-[#170D1C]/95 z-30 transition-all duration-300 md:hidden ${
        isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
      }`} style={{ backdropFilter: 'blur(5px)' }}>
        {/* Close button in the top-right corner */}
        <button 
          className="absolute top-6 right-6 text-white hover:text-gray-300 focus:outline-none bg-[#2D1F3A] p-3 rounded-xl shadow-lg"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-label="Close menu"
        >
          <FontAwesomeIcon icon={faTimes} className="h-6 w-6" />
        </button>
        
        <div className="flex flex-col items-center justify-center h-full space-y-6 p-6">
          <MobileNavLink text="HOME" onClick={() => scrollToSection('home')} delay="100ms" menuOpen={isMobileMenuOpen} />
          <MobileNavLink text="FEATURES" onClick={() => scrollToSection('features')} delay="150ms" menuOpen={isMobileMenuOpen} />
          <MobileNavLink text="BENEFITS" onClick={() => scrollToSection('benefits')} delay="200ms" menuOpen={isMobileMenuOpen} />
          <MobileNavLink text="SERVICES" onClick={() => scrollToSection('services')} delay="250ms" menuOpen={isMobileMenuOpen} />
          <MobileNavLink text="CONTACT" onClick={() => scrollToSection('contact')} delay="300ms" menuOpen={isMobileMenuOpen} />
          
          {/* Mobile Auth Buttons */}
          <div className={`pt-6 border-t border-gray-700 w-2/3 flex flex-col items-center space-y-4 transform transition-all duration-500 ease-out ${
            isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'
          }`} style={{ transitionDelay: '350ms' }}>
            <Link to="/login" className="w-full">
              <Button 
                text="LOGIN" 
                bgColor="#00718A" 
                hoverBgColor="#005d73" 
                className="!text-[#6FFFE9] text-base font-medium" 
                width="w-full"
                rounded="rounded-full"
                onClick={() => setIsMobileMenuOpen(false)}
              />
            </Link>
            <Link to="/register" className="w-full">
              <Button 
                text="REGISTER" 
                bgColor="#00718A" 
                hoverBgColor="#005d73" 
                className="!text-[#6FFFE9] text-base font-medium" 
                width="w-full"
                rounded="rounded-full"
                onClick={() => setIsMobileMenuOpen(false)}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper components
const NavLink = ({ text, onClick }) => (
  <a 
    href={`#${text.toLowerCase().replace(/\s+/g, '-')}`}
    className="text-white hover:text-gray-300 transition-colors cursor-pointer"
    onClick={(e) => { e.preventDefault(); onClick(); }}
  >
    {text}
  </a>
);

const MobileNavLink = ({ text, onClick, delay, menuOpen }) => (
  <a 
    href={`#${text.toLowerCase().replace(/\s+/g, '-')}`}
    className={`text-white text-xl font-medium transform transition-all duration-500 ease-out cursor-pointer ${
      menuOpen ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'
    }`} 
    style={{ transitionDelay: delay }}
    onClick={(e) => { e.preventDefault(); onClick(); }}
  >
    {text}
  </a>
);

export default Navbar;
