import React from 'react'
import Card from '../components/common/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';

const PortfolioSummary = ({ portfolioData }) => {
  return (
    <Card>
      <div className="flex flex-col justify-between h-auto w-full">
        <div className="p-3 sm:p-4 md:p-6 text-left">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6">Portfolio Overview</h2>
          
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {portfolioData.map((item, index) => (
              <Card 
                key={index}
                bgColor="bg-[#1C2541]"
                className="border border-white hover:shadow-lg transition-all duration-300"
                padding="p-3 sm:p-4"
              >
                <div className="flex flex-col justify-between h-full">
                  <div className="text-[#666565] text-sm sm:text-base md:text-lg mb-1 text-left">
                    {item.title}
                  </div>
                  <div className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 text-center">
                    {item.value}
                  </div>
                  <div className="mt-auto flex justify-center">
                    {item.showCalendar ? (
                      <div className="text-blue-500 text-base sm:text-lg md:text-xl flex items-center">
                        <FontAwesomeIcon icon={faCalendar} className="mr-2" />
                        {item.info}
                      </div>
                    ) : (
                      <div className={`${item.isPositive ? 'text-green-500' : 'text-red-500'} text-base sm:text-lg md:text-xl`}>
                        <FontAwesomeIcon icon={item.isPositive ? faArrowUp : faArrowDown} className="mr-1" />
                        {item.change}
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}

export default PortfolioSummary