import React from 'react';
import Background from './Background';
import FooterLinks from './FooterLinks';

const Footer = () => {
  return (
    <Background 
      bgColor="bg-linear-[180deg,#1C2541,#3A506B_47%,#0B132B_90%]" 
      fullHeight={false} 
      className="text-white py-10"
    >
      <FooterLinks/>
    </Background>
  );
};

export default Footer;