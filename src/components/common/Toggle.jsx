import React from 'react';

const Toggle = ({ 
  id, 
  checked = false, 
  onChange, 
  label,
  activeColor = "#5BC0BE"
}) => {
  return (
    <div className="flex items-center justify-between py-2">
      {label && <label htmlFor={id} className="text-gray-300 cursor-pointer">{label}</label>}
      <div 
        className="relative inline-block w-12 h-6 rounded-full bg-gray-700 cursor-pointer"
        onClick={onChange}
      >
        <input 
          type="checkbox" 
          id={id} 
          className="sr-only peer" 
          checked={checked} 
          onChange={() => {}} // Prevent React warning about controlled component
        />
        <span 
          className="absolute inset-0 rounded-full transition-colors cursor-pointer"
          style={{ backgroundColor: checked ? activeColor : '' }} 
        />
        <span 
          className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform cursor-pointer"
          style={{ transform: checked ? 'translateX(24px)' : 'translateX(0)' }} 
        />
      </div>
    </div>
  );
};

export default Toggle;