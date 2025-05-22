import React from 'react';
import Card from '/src/components/common/Card';
import Button from '/src/components/common/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

import IconPie from '/src/assets/images/ServicesIcons/piechart.svg';
import IconSpeedometer from '/src/assets/images/ServicesIcons/speedometer.svg';
import IconCreditCard from '/src/assets/images/ServicesIcons/creditcard.svg';
import IconBook from '/src/assets/images/ServicesIcons/book.svg';
import IconTarget from '/src/assets/images/ServicesIcons/target.svg';

const services = [
  {
    icon: IconPie,
    title: 'Mutual Funds & SIPs',
    desc: 'Compare funds with easy metrics, manage SIPs, and track performance',
  },
  {
    icon: IconSpeedometer,
    title: 'Financial Health Dashboard',
    desc: 'See your health score and track your net worth, savings, and investments',
  },
  {
    icon: IconCreditCard,
    title: 'Spend Tracking',
    desc: 'Sync accounts to categorize expenses and monitor monthly trends',
  },
  {
    icon: IconBook,
    title: 'Goal-Based Planning',
    desc: 'Create financial goals and monitor progress against your timeline',
  },
  {
    icon: IconTarget,
    title: 'Financial Education Hub',
    desc: 'Get bite-sized lessons on investment and finance topics',
  },
];

const Services = () => {
  const navigate = useNavigate();
  
  const handleExplore = () => {
    navigate('/home');
  };

  return (
    <div id="services" className="w-full min-h-screen text-white flex items-center justify-center py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-2">Our Services</h2>
          <p className="text-[#6FFFE9] text-base md:text-xl">Everything you need to manage your money</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <Card 
              key={index}
            //   bgColor="bg-gradient-to-bl from-[#6FFFE9] via-[#5BC0BE] via-30% via-[#14265C] via-51% to-[#0B132B] via-31%"
              padding="p-6"
              className="shadow-lg text-left flex flex-col gap-4 min-h-[180px]"
            >
              <img src={service.icon} alt={service.title} className="w-12 h-12 md:w-15 md:h-15" />
              <h3 className="text-[#6FFFE9] font-semibold text-lg">{service.title}</h3>
              <p className="text-white text-sm md:text-base">{service.desc}</p>
            </Card>
          ))}
          <div className="flex items-center justify-center">
            <Button 
              text="Explore" 
              icon={<FontAwesomeIcon icon={faArrowRight} />} 
              iconPosition="after"
              width="w-36"
              bgColor="#6FFFE9"
              hoverBgColor="#5BC0BE"
              rounded="rounded-full"
              className="text-[#0B132B] font-semibold"
              onClick={handleExplore}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
