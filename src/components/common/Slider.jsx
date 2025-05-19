import React, { useState, useEffect, useRef } from 'react';

const Slider = ({ 
  min = 0, 
  max = 100, 
  step = 1, 
  defaultValue = 0, 
  onChange,
  trackColor = '#6FFFE9',
  thumbColor = '#5aebe9',
  backgroundColor = '#6B7280',
  valueLabelFormat,
  showValueLabel = true,
  className = ''
}) => {
  const [value, setValue] = useState(defaultValue);
  const sliderRef = useRef(null);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const handleChange = (e) => {
    const newValue = parseFloat(e.target.value);
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  const getFormattedValue = () => {
    if (valueLabelFormat) {
      return valueLabelFormat(value);
    }
    return value;
  };

  // Calculate percentage for custom styling
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center">
        <input
          ref={sliderRef}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          className={`w-full h-2 appearance-none rounded-full`}
          style={{
            background: `linear-gradient(to right, ${trackColor} 0%, ${trackColor} ${percentage}%, ${backgroundColor} ${percentage}%, ${backgroundColor} 100%)`,
            cursor: 'pointer',
            // Custom styling for the thumb
            WebkitAppearance: 'none',
          }}
        />
        {showValueLabel && (
          <span className="ml-3 min-w-[50px] text-right text-sm font-medium">
            {getFormattedValue()}
          </span>
        )}
      </div>
    </div>
  );
};

export default Slider;