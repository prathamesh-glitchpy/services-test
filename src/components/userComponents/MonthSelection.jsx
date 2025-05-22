import React, { useState } from 'react';

const MonthSelection = ({ selectedMonth, onMonthChange }) => {
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  
  // Sample past months for dropdown
  const pastMonths = [
    'May 2025', 'April 2025', 'March 2025', 
    'February 2025', 'January 2025', 'December 2024'
  ];
  
  // Handle month selection
  const handleMonthSelect = (month) => {
    onMonthChange(month);
    setShowMonthDropdown(false);
  };

  return (
    <div className="relative">
      <button 
        className="bg-[#6FFFE9] text-black text-sm font-medium px-3 py-1 rounded-full flex items-center"
        onClick={() => setShowMonthDropdown(!showMonthDropdown)}
      >
        {selectedMonth}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className={`ml-1 w-4 h-4 transition-transform ${showMonthDropdown ? 'rotate-180' : ''}`} 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {showMonthDropdown && (
        <div className="absolute z-10 mt-1 right-0 w-36 bg-gray-800 rounded-md shadow-lg overflow-hidden">
          {pastMonths.map((month, index) => (
            <button
              key={index}
              className={`block w-full text-left px-4 py-2 text-sm ${
                month === selectedMonth ? 'bg-gray-700 text-cyan-300' : 'text-white hover:bg-gray-700'
              }`}
              onClick={() => handleMonthSelect(month)}
            >
              {month}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MonthSelection;