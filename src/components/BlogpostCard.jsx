import React from 'react';
import Card from './common/Card';

const BlogpostCard = ({ title, backgroundImage, backgroundColor = '#C7C7C7', height = 'h-[200px] sm:h-[240px] md:h-[274px]' }) => {
  const cardStyle = backgroundImage 
    ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : { backgroundColor };

  return (
    <Card className={`relative overflow-hidden`} height={height}>
      <div 
        className="absolute inset-0 w-full h-full" 
        style={cardStyle}
      />
      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6 bg-gradient-to-t from-black/70 to-transparent">
        <p className="text-white font-medium text-base sm:text-lg md:text-xl">{title}</p>
      </div>
    </Card>
  );
};

export default BlogpostCard;
