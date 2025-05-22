import React from 'react';
import Card from '/src/components/common/Card';

// Import SVG icons
import IconBell from '/src/assets/images/BenefitsIcons/bell.svg';
import IconBook from '/src/assets/images/BenefitsIcons/book.svg';
import IconCreditCard from '/src/assets/images/BenefitsIcons/creditcard.svg';
import IconSpeedometer from '/src/assets/images/BenefitsIcons/speedometer.svg';
import IconPie from '/src/assets/images/BenefitsIcons/PieChart.svg';
import UserImage from '/src/assets/images/DisplayImages/UserImage.webp';

// Desktop icon configuration
const desktopIconArray = [
  { src: IconPie, alt: 'Time Management', style: 'top-[-1px] right-[-10px]', size: 'w-40 h-40' },
  { src: IconSpeedometer, alt: 'Performance', style: 'top-45 right-[-140px] -translate-x-1/2', size: 'w-36 h-36' }, 
  { src: IconCreditCard, alt: 'Payments', style: 'top-85 right-[-110px] -translate-x-1/2', size: 'w-32 h-32' },
  { src: IconBook, alt: 'Learning', style: 'bottom-[-50px] right-[-10px] -translate-x-1/2', size: 'w-28 h-28' },
  { src: IconBell, alt: 'Notifications', style: 'bottom-[-80px] right-[200px]', size: 'w-24 h-24' },
];

// Mobile icon configuration with properly scaled positions
const mobileIconArray = [
  { src: IconPie, alt: 'Time Management', style: 'top-0 right-0', size: 'w-20 h-20' },
  { src: IconSpeedometer, alt: 'Performance', style: 'top-20 right-[-70px] -translate-x-1/2', size: 'w-18 h-18' }, 
  { src: IconCreditCard, alt: 'Payments', style: 'top-40 right-[-55px] -translate-x-1/2', size: 'w-16 h-16' },
  { src: IconBook, alt: 'Learning', style: 'bottom-[-25px] right-[-5px] -translate-x-1/2', size: 'w-14 h-14' },
  { src: IconBell, alt: 'Notifications', style: 'bottom-[-40px] right-[100px]', size: 'w-12 h-12' },
];

const BenefitsDisplay = () => {
  return (
    <div className="w-full flex justify-center">
      {/* Desktop view */}
      <div className="hidden md:block relative">
        <Card 
          width="w-[616px]" 
          height="h-[542px]" 
          rounded="rounded-[0px]"
          bgColor="bg-gradient-to-b from-[#6FFFE9] to-[#192E48]"
        >
        </Card>

        <img 
          src={UserImage} 
          alt="User" 
          className="absolute -bottom-8 -right-8 w-[616px] h-[542px]"
        />

        {/* Desktop icons */}
        {desktopIconArray.map((icon, index) => (
          <img 
            key={index}
            src={icon.src} 
            alt={icon.alt} 
            className={`absolute ${icon.style} ${icon.size}`}
          />
        ))}
      </div>
      
      {/* Mobile view with fixed dimensions */}
      <div className="md:hidden relative w-[306px] h-[271px]">
        <Card 
          width="w-full" 
          height="h-full" 
          rounded="rounded-[0px]"
          bgColor="bg-gradient-to-b from-[#6FFFE9] to-[#192E48]"
        >
        </Card>

        <img 
          src={UserImage} 
          alt="User" 
          className="absolute -bottom-4 -right-4 w-full h-full object-cover"
        />

        {/* Mobile icons */}
        {mobileIconArray.map((icon, index) => (
          <img 
            key={index}
            src={icon.src} 
            alt={icon.alt} 
            className={`absolute ${icon.style} ${icon.size}`}
          />
        ))}
      </div>
    </div>
  );
};

export default BenefitsDisplay;