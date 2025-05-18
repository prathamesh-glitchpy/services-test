import React from 'react';
import Card from './Card';

const EducationCard = ({ 
  thumbnail, 
  level, 
  title, 
  description,
  onClick
}) => {
  // Map level to color
  const levelColorMap = {
    'Beginner': 'bg-green-500',
    'Intermediate': 'bg-yellow-500',
    'Advanced': 'bg-red-500'
  };

  const levelColor = levelColorMap[level] || 'bg-blue-500';

  return (
    <Card 
      className="flex flex-col overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer h-[360px] transform hover:scale-105 hover:-translate-y-1 hover:shadow-xl"
      onClick={onClick}
    >
      {/* Thumbnail section with level badge */}
      <div className="relative w-full h-56 overflow-hidden" style={{ backgroundColor: thumbnail || '#0B132B' }}>
        {thumbnail && typeof thumbnail === 'string' && !thumbnail.startsWith('#') && (
          <img 
            src={thumbnail} 
            alt={title}
            className="w-full h-full object-cover"
          />
        )}
        <div className={`absolute bottom-2 left-2 ${levelColor} text-white text-xs px-2 py-1 rounded-md`}>
          {level}
        </div>
      </div>
      
      {/* Content section */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
        <p className="text-gray-300 text-base flex-grow">{description}</p>
      </div>
    </Card>
  );
};

export default EducationCard;